using Microsoft.AspNetCore.SignalR;

namespace UdemySignalR.Web.Hubs
{
    public class ExampleTypeSafeHub : Hub<IExampleTypeSafeHub>
    {
        private static int ConnectedClientCount = 0;
        public async Task BroadcastMessageToAllClient(string message)
        {
            await Clients.All.ReceiveMessageForAllClient(message); //Type safe
            /*
            await Clients.All.SendAsync("ReceiveMessageForAllClient", message); //Tüm misafirlere gönder (Bir misafirin message değişkenini yolladığında tüm misafirlere gönderir)(JS tarafındaki ReceiveMessageForAllClient javascript fonksiyonu tetiklenir)
            */
        }

        public async Task BroadcastMessageToCallerClient(string message)
        {
            await Clients.Caller.ReceiveMessageForCallerClient(message); //Type safe
           
        }  
        
        public async Task BroadcastMessageForOtherClients(string message)
        {
            await Clients.Others.ReceiveMessageForOtherClients(message); //Type safe
           
        }

        public async Task BroadcastMessageForSpecialClient(string connectionId, string message)
        {
            await Clients.Client(connectionId).ReceiveMessageForSpecialClient(message); //Type safe
           
        }


        public async Task BroadcastmessageToGroupClients(string groupName, string message)
        {
            await Clients.Group(groupName).ReceiveMessageForGroupClients(message);
        }

        public async Task AddGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} grubuna dahil oldun.");
            //await Clients.Others.ReceiveMessageForOtherClients($"Kullanıcı({Context.ConnectionId}) {groupName} dahil oldu.");
            await Clients.Group(groupName).ReceiveMessageForGroupClients($"Kullanıcı({Context.ConnectionId}) {groupName} dahil oldu.");
        }

        public async Task RemoveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} grubundan çıktın.");
            //await Clients.Others.ReceiveMessageForOtherClients($"Kullanıcı({Context.ConnectionId}) {groupName} grubundan çıktı.");
            await Clients.Group(groupName).ReceiveMessageForGroupClients($"Kullanıcı({Context.ConnectionId}) {groupName} grubundan çıktı.");
        }

        public override async Task OnConnectedAsync()
        {
            ConnectedClientCount++;
            await Clients.All.ReceiveConnectedClientCountAllClient(ConnectedClientCount);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            ConnectedClientCount--;
            await Clients.All.ReceiveConnectedClientCountAllClient(ConnectedClientCount);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
