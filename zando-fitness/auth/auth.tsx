"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { NextRequest } from "next/server";

export async function createCookie(data: string) {
    cookies().set({
        name: "jwt",
        value: data,
        expires: new Date(Date.now() + 86400e3),
        secure: true,
    });
}

export async function getCookie() {
    try {
        const cookieStore = cookies();
        const jwtCookie = cookieStore.get("jwt");
        console.log("JWT Cookie:", jwtCookie); // Log the retrieved cookie
        const token = jwtCookie?.value;
        console.log("Token:", token); // Log the retrieved token
        return token;
    } catch (error) {
        console.error("Error retrieving JWT token:", error);
        return null;
    }
}

export async function getAllCookies() {
    const cookieStore = cookies();
    cookieStore.getAll().map((cookie) => console.log(cookie.name + cookie.value));
}

export async function getUserIdFromToken(): Promise<string | null> {
    try {
        const token = await getCookie(); // Retrieve JWT token
        if (!token) {
            console.error("JWT token not found");
            return null;
        }

        const decodedToken: any = jwtDecode(token);
        if (!decodedToken || typeof decodedToken !== "object") {
            console.error("Invalid JWT token format");
            return null;
        }

        const userId = decodedToken.id;
        if (!userId) {
            console.error("User ID not found in JWT token");
            return null;
        }

        return userId;
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return null;
    }
}

export async function checkIfUserIsAuthenticated(request: NextRequest): Promise<boolean> {
    try {
        const token = request.cookies.get("jwt")?.value;
        if (!token) {
            return false; // Return false if token is empty or not found
        }

        const decodedToken: any = jwtDecode(token); // Decode JWT token
        const expiryDateInSeconds = decodedToken.exp; // Extract expiration timestamp from decoded token

        // Get the current timestamp in seconds
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

        // Check if the token is expired
        const isExpired = expiryDateInSeconds < currentTimestampInSeconds;

        return !isExpired;
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return false;
    }
}