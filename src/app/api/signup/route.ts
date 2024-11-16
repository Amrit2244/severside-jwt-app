import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/config/connectDB";

export async function POST(request: Request) {
      await connectDB()
    
    try {
        // Connect to the database
        

        // Extract data from the request
        const { email, password } = await request.json();

        // Validate the input
        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: "Email and password are required" }),
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "User already exists" }),
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Return success response
        return new Response(
            JSON.stringify({ message: "Signup successful" }),
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}
