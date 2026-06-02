import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, campus, category, message } = body;

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill out all required fields (Name, Email, and Message)." },
        { status: 400 }
      );
    }

    // Mock processing - in a real app, this would send an email or store in a database
    console.log("Contact form submission logged:", {
      name,
      email,
      role: role || "N/A",
      campus: campus || "N/A",
      category: category || "N/A",
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! The CAPS team will respond to your query shortly."
    });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong while processing your request. Please try again later." },
      { status: 500 }
    );
  }
}
