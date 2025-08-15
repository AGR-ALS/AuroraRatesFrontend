"use client"

import {
    Box,
    Button,
    Group,
} from '@mantine/core';
import classes from './HeaderMegaMenu.module.css';
import { useEffect, useState} from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import {usePathname, useRouter} from "next/navigation";
import {checkAuth, LogoutUser} from "@/app/services/UserAuthenticationService";

interface LinkElement {
    key: string;
    value: string;
}

type MenuProps = {
    mainTab: LinkElement;
    typeTabs: LinkElement[];
    loginLink: LinkElement;
    signupLink: LinkElement;
    logoutLink: LinkElement;
}


export function HeaderMegaMenu({mainTab, typeTabs, signupLink, loginLink, logoutLink}: MenuProps) {


    const router = useRouter();
    const [active, setActive] = useState<string|null>(typeTabs[0].value);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        checkAuth().then((isAuth) => setIsAuthenticated(isAuth));
    }, [pathname]);



    const handleLogout = async () => {
        await LogoutUser()
        setIsAuthenticated(false);

        router.push(logoutLink.value);
    }


    const tabItems = typeTabs.map((item: LinkElement) => (
        <Link className={classes.tabLink}
              key={item.key}
              onClick={() => {
                  setActive(item.value);
              }} data-active={active === item.value || undefined} href={item.value} style={{color: "white", textDecoration: "none"}}>{item.key}</Link>

    ))

    return (
        <Box >
            <header className={classes.header}>
                <Group justify="space-between" h="100%">

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link className={classes.tabLink}
                              key={mainTab.key}
                              onClick={() => {
                                  setActive(mainTab.value);
                              }} data-active={active === mainTab.value || undefined} href={mainTab.value} style={{color: "white", textDecoration: "none"}}>{mainTab.key}</Link>
                    </Group>

                    <Group gap={5} visibleFrom="xs">
                            {tabItems}
                    </Group>

                    <Group visibleFrom="sm">
                        {isAuthenticated ? (
                            <Button variant="light" onClick={handleLogout}>Log out</Button>
                        ) : (
                            <>
                                <Button variant="default" onClick={() => {
                                    console.log(isAuthenticated);
                                    console.log(Cookies.get("token"));
                                    router.push(loginLink.value);
                                    setActive(null);
                                }}>Log in</Button>
                                <Button onClick={() => {
                                    router.push(signupLink.value);
                                    setActive(null);
                                }}>Sign up</Button>
                            </>
                        )}
                    </Group>

                </Group>
            </header>
        </Box>
    );
}