import "./globals.css";
import { Button, Center, Title } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
    return (
        <div
            style={{
                height: "93.5vh",
                verticalAlign: "top",
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url("https://localhost:7131/Background/futuristic-galaxy-border-background-gray-minimal-style.jpg")`,
                marginTop: '0'
            }}
        >
            <Center style={{ flexDirection: 'column', gap: 20}}>
                <Title order={1} size="h1" style={{ color: '#fff', fontWeight: 800 }}>
                    Aurora Rates
                </Title>
                <Link href="/reviews" passHref>
                    <Button size="lg" radius="xl">
                        Explore Reviews
                    </Button>
                </Link>
            </Center>
        </div>
    );
}
