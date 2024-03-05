using Microsoft.AspNetCore.SignalR;

namespace UdemySignalR.Web.Hubs
{
    public class ExampleHub : Hub
    {
        public async Task BroadcastMessageToAllClient(string message)
        {
            await Clients.All.SendAsync("ReceiveMessageForAllClient", message); //Tüm misafirlere gönder (Bir misafirin message değişkenini yolladığında tüm misafirlere gönderir)(JS tarafındaki ReceiveMessageForAllClient javascript fonksiyonu tetiklenir)
        }
    }
}
