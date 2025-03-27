import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    //get the data
    const reqBody = await request.json();
    //destructure it
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    console.log(user.email);

    if (!user) {
      console.error(error);
      return NextResponse.json(
        { error: "email not in db signup-Error" },
        { status: 400 }
      );
    }
    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
