import { NextRequest, NextResponse } from "next/server";
import FacebookConversionAPI from "@rivercode/facebook-conversion-api";
import getUrl from "@/utils/get-url";
import { getSubdomainName } from "@/lib";

export async function POST(req: NextRequest) {
  try {
    // Fetching the pixelId dynamically
    const url = getUrl();
    const subDomain = await getSubdomainName(url, "design,headersetting");
    const headersetting = subDomain?.headersetting;
    const pixelId = headersetting?.facebook_pixel;

    if (!pixelId) {
      return NextResponse.json(
        { error: "Facebook Pixel ID not found." },
        { status: 400 }
      );
    }

    // Accessing the Facebook Access Token from environment variables
    const accessToken = process.env.NEXT_PUBLIC_FB_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token is not defined." },
        { status: 400 }
      );
    }

    // Extracting other fields from the request body
    const { productSku, quantity, sourceUrl } = await req.json();

    if (!productSku || !quantity || !sourceUrl) {
      return NextResponse.json(
        { error: "Missing required parameters." },
        { status: 400 }
      );
    }

    // Getting client IP and User Agent from the request headers
    const clientIp = req.headers.get("x-forwarded-for") || req.ip || "";
    const userAgent = req.headers.get("user-agent") || "";

    // Initialize the Facebook Conversion API
    const FBConversionAPI = new FacebookConversionAPI(
      accessToken,
      pixelId,
      ["moon@gmail.com", "ebitans@gmail.com"], // Replace with actual data
      ["01712714334", "01712714334"], // Replace with actual data
      clientIp,
      userAgent,
      "fbp",
      "fpc"
    );

    // Add the product to the conversion event
    FBConversionAPI.addProduct(productSku, quantity);

    // Send the "ViewContent" event to Facebook
    FBConversionAPI.sendEvent(
      "ViewContent",
      sourceUrl,
      { value: 1000, currency: "USD" }, // Adjust with dynamic values
      { eventId: "eventId" } // Replace with dynamic event ID
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Facebook Conversion API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
