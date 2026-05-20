import { NextResponse } from "next/server";

// M-Pesa Daraja API Integration
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || "";
const PASS_KEY = process.env.MPESA_PASS_KEY || "";
const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE || "174379";
const ENVIRONMENT = process.env.MPESA_ENVIRONMENT || "sandbox";

const BASE_URL = ENVIRONMENT === "production"
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke";

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

  const response = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    method: "GET",
    headers: { Authorization: `Basic ${auth}` },
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "stk-push":
        return handleSTKPush(data);
      case "query":
        return handleQuery(data);
      case "callback":
        return handleCallback(data);
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("M-Pesa error:", error);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}

async function handleSTKPush(data: any) {
  const { phoneNumber, amount, accountReference, transactionDesc } = data;

  const accessToken = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const password = Buffer.from(
    `${BUSINESS_SHORT_CODE}${PASS_KEY}${timestamp}`
  ).toString("base64");

  const payload = {
    BusinessShortCode: BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.round(amount),
    PartyA: phoneNumber,
    PartyB: BUSINESS_SHORT_CODE,
    PhoneNumber: phoneNumber,
    CallBackURL: `${process.env.NEXTAUTH_URL}/api/payments?action=callback`,
    AccountReference: accountReference || "PriorityAqua",
    TransactionDesc: transactionDesc || "Water Delivery Payment",
  };

  const response = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result.ResponseCode === "0") {
    return NextResponse.json({
      success: true,
      checkoutRequestId: result.CheckoutRequestID,
      merchantRequestId: result.MerchantRequestID,
      customerMessage: result.CustomerMessage,
    });
  }

  return NextResponse.json(
    { error: result.errorMessage || "STK Push failed" },
    { status: 400 }
  );
}

async function handleQuery(data: any) {
  const { checkoutRequestId } = data;

  const accessToken = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const password = Buffer.from(
    `${BUSINESS_SHORT_CODE}${PASS_KEY}${timestamp}`
  ).toString("base64");

  const payload = {
    BusinessShortCode: BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestId,
  };

  const response = await fetch(`${BASE_URL}/mpesa/stkpushquery/v1/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  return NextResponse.json(result);
}

async function handleCallback(data: any) {
  // Handle M-Pesa callback
  const { Body } = data;

  if (Body.stkCallback.ResultCode === 0) {
    // Payment successful
    const { MpesaReceiptNumber, TransactionDate, PhoneNumber, Amount } = 
      Body.stkCallback.CallbackMetadata.Item.reduce((acc: any, item: any) => {
        acc[item.Name] = item.Value;
        return acc;
      }, {});

    // Update payment status in database
    // await prisma.payment.update(...)

    return NextResponse.json({ success: true });
  }

  // Payment failed
  return NextResponse.json({ success: false, error: Body.stkCallback.ResultDesc });
}
