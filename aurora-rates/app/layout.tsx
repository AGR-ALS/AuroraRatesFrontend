import "./globals.css";
import {
    MantineProvider,
} from "@mantine/core";
import '@mantine/core/styles.css';
import {HeaderMegaMenu} from "@/app/components/MantineHeaderMenu/HeaderMegaMenu";
import {Suspense} from "react";


const items = [
    {key: "Home", value: "/"},
    {key: "Register", value: "/users/login?authenticationType=register"},
    {key: "Login", value: "/users/login?authenticationType=login"},
    {key: "Logout", value: "/reviews"},
];


const typeTabs = [ //потом сделать через БД
    {key: "Movies", value: "/reviews?MediaTypeName=Movie"},
    {key: "Games", value: "/reviews?MediaTypeName=Game"},
    {key: "Music", value: "/reviews?MediaTypeName=Music"},
    {key: "Series", value: "/reviews?MediaTypeName=Series"},
]


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body>
        <MantineProvider defaultColorScheme="dark">
            <HeaderMegaMenu typeTabs={typeTabs} mainTab={items[0]} loginLink={items[2]} signupLink={items[1]} logoutLink={items[3]} />
            <main>
                <Suspense>
                {children}
                </Suspense>
            </main>
        </MantineProvider>
        </body>
        </html>
    );
}
