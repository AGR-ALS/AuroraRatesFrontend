# Launch Instractions

## Docker Setup

1. **Install docker**

    [Instructions here](https://www.docker.com/get-started)

2. **Clone repositories**
    
    ```cmd
    git clone https://github.com/AGR-ALS/AuroraRatesBackend.git
    git clone https://github.com/AGR-ALS/AuroraRatesFrontend.git
    ```

3. **Build and run**

    ```cmd
    cd .\AuroraRatesBackend\
    docker compose up --build -d
    ```

4. **Acess Frontend**

    Open [localhost:3000](http://localhost:3000)

## Local Setup

1. **Install dotnet**

    [Instructions here](https://dotnet.microsoft.com/en-us/download)

2. **Clone repositories**
    
    ```cmd
    git clone https://github.com/AGR-ALS/AuroraRatesBackend.git
    git clone https://github.com/AGR-ALS/AuroraRatesFrontend.git
    ```

3. **Build and run**

    ```cmd
    cd .\AuroraRatesBackend\
    dotnet run --launch-profile https
    cd ..
    cd .\AuroraRatesFrontend\aurora-rates\
    npm run dev
    ```

4. **Access Frontend**

    Open [localhost:3000](http://localhost:3000)
