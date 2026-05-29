import * as signalR from "@microsoft/signalr";

const CHAT_HUB = process.env.NEXT_PUBLIC_SIGNALR_CHAT_HUB || "http://localhost:57619/hubs/chat";
const NOTIF_HUB = process.env.NEXT_PUBLIC_SIGNALR_NOTIF_HUB || "http://localhost:57619/hubs/notifications";

function getToken(): string {
  if (typeof window === "undefined") return "";
  const stored = localStorage.getItem("hms-auth");
  if (!stored) return "";
  const { state } = JSON.parse(stored);
  return state?.token || "";
}

export function createChatConnection(): signalR.HubConnection {
  return new signalR.HubConnectionBuilder()
    .withUrl(CHAT_HUB, {
      accessTokenFactory: getToken,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .configureLogging(signalR.LogLevel.Warning)
    .build();
}

export function createNotificationConnection(): signalR.HubConnection {
  return new signalR.HubConnectionBuilder()
    .withUrl(NOTIF_HUB, {
      accessTokenFactory: getToken,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .configureLogging(signalR.LogLevel.Warning)
    .build();
}
