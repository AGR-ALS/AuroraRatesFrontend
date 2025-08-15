export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserRegisterRequest {
    nickname: string;
    email: string;
    password: string;
}

export const LoginUser = async (user: UserLoginRequest) => {
    const response = await fetch("https://localhost:7131/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include"
    });

    if(response.status === 500) {
        throw new Error("Incorrect login or password");
    }
    else if(!response.ok){
        throw new Error("Login error");
    }

}

export const RegisterUser = async (user: UserRegisterRequest) => {
    const registerResponse = await fetch("https://localhost:7131/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include"
    });
    const loginResponse = await fetch("https://localhost:7131/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user as UserLoginRequest),
        credentials: "include"
    });
}

export const checkAuth = async (): Promise<boolean> => {
    try {
        const response = await fetch("https://localhost:7131/users/isAuth", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) return false;

        const result = await response.json();

        return result;

    } catch (error) {
        console.error("Auth check failed", error);
        return false;
    }
};

export const LogoutUser = async () => {
    try {
        const res = await fetch("https://localhost:7131/users/logout", {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Logout failed", res.statusText);
            return;
        }

    } catch (error) {
        console.error("Logout error", error);
    }
};

export const GetUserNickname = async (): Promise<string | null> => {
    try {
        const res = await fetch("https://localhost:7131/users/getUsername", {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Failed getting user username", res.statusText);
            return null;
        }

        const result = await res.json();

        return result;

    } catch (error) {
        console.error("Failed fetching username", error);
        return null;
    }
}
