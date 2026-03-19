using Microsoft.AspNetCore.SignalR;

namespace BEERAPI.HubTransactions
{
    public class PaymentHub : Hub
    {
        public async Task JoinGroup(string orderId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, orderId);
        }
    }
}
