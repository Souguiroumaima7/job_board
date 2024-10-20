FROM openjdk:17-jdk-slim as backend-build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jre-slim
COPY --from=backend-build /app/target/job-board-1.0.0.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

