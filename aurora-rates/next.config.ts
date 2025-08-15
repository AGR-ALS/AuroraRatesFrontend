import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // отключаем падение сборки при ошибках ESLint
        ignoreDuringBuilds: true,
    },

  /* config options here */
};


export default nextConfig;
