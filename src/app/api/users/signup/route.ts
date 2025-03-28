import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { error } from 'console'
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import {sendEmail} from '@/helpers/mailer'


connect()

export async function POST(request:NextRequest){


    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody

        //validation
        console.log(reqBody);   

        const user=await User.findOne({email})
        if (user) {
            return  NextResponse.json({error:"User already exits"},{status:400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

       const newUser= new User({
        username,
        email,
        password:hashPassword,
        })
        
        const savedUser=await newUser.save()
        console.log(savedUser);

        //send verification mail

        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:"User Register Succesfully",
            success:true,
            savedUser
        })
        
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}