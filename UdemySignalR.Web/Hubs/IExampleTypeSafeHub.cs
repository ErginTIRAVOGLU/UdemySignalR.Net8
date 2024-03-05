namespace UdemySignalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClient(string message);
        Task ReceiveConnectedClientCountAllClient(int clientCount);
        Task ReceiveMessageForCallerClient(string message);
        Task ReceiveMessageForOtherClients(string message);
        Task ReceiveMessageForSpecialClient(string message);
        Task ReceiveMessageForGroupClients(string message);
    }
}
