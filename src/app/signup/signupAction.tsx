"use server";

export default async function signupAction(formdata: FormData) {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        return { success: true };
    } else {
        const errorData = await res.json();
        return { success: false, error: errorData.error || "Signup failed" };
    }
}
