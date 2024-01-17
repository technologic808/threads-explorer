# Stage 1: Build the Next.js application
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Node.js
FROM node:latest as server-stage
WORKDIR /app
COPY --from=build-stage /app/next.config.js ./
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
