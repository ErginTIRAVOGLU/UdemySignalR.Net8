$(function () {
    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const broadcastMessageToCallerClient = "BroadcastMessageToCallerClient";
    const broadcastMessageForOtherClients = "BroadcastMessageForOtherClients";
    const broadcastMessageForSpecialClient = "BroadcastMessageForSpecialClient";
    const broadcastmessageToGroupClients = "BroadcastmessageToGroupClients"; 

    const receiveMessageForCallerClient = "ReceiveMessageForCallerClient";
    const receiveMessageForOtherClients = "ReceiveMessageForOtherClients";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";
    const receiveConnectedClientCountAllClient = "ReceiveConnectedClientCountAllClient";
    const receiveMessageForSpecialClient = "ReceiveMessageForSpecialClient";
    const receiveMessageForGroupClients = "ReceiveMessageForGroupClients";

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub").configureLogging(signalR.LogLevel.Information).build();

    const groupA = "GroupA";
    const groupB = "GroupB";
    let currentGroupList = [];

    function refreshGroupList() {
        $("#groupList").empty();
        currentGroupList.forEach(x => {
            $("#groupList").append(`<p>${x}</p>`);
        })

    }

    $("#btn-groupA-add").click(function () {
        if (currentGroupList.includes(groupA)) {
            return;
        }

        connection.invoke("AddGroup", groupA).then(() => {
            currentGroupList.push(groupA);
            refreshGroupList();
        });
    });

    $("#btn-groupA-remove").click(function () {

        if (!currentGroupList.includes(groupA)) {
            return;
        }

        connection.invoke("RemoveGroup", groupA).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupA);
            refreshGroupList();
        });
    });

    $("#btn-groupB-add").click(function () {

        if (currentGroupList.includes(groupB)) {
            return;
        }

        connection.invoke("AddGroup", groupB).then(() => {
            currentGroupList.push(groupB);
            refreshGroupList();
        });
    });

    $("#btn-groupB-remove").click(function () {

        if (!currentGroupList.includes(groupB)) {
            return;
        }

        connection.invoke("RemoveGroup", groupB).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupB);
            refreshGroupList();
        });
    });

    $("#btn-groupA-send-message").click(function () {

        const message = "hello group A";

        connection.invoke(broadcastmessageToGroupClients, groupA, message).catch(err =>
            console.error("hata", err));

        console.log("Mesaj Gönderildi");

    });

    connection.on(receiveMessageForGroupClients, (message) => {
        console.log("Gelen Mesaj : " + message);

    });

    $("#btn-groupB-send-message").click(function () {


        const message = "hello group B";

        connection.invoke(broadcastmessageToGroupClients, groupB, message).catch(err =>
            console.error("hata", err));

        console.log("Mesaj Gönderildi");
    });
   




    $("#btn-send-message-all-client").click(function () {
        const message = "hello world";

        connection.invoke(broadcastMessageToAllClientHubMethodCall, message).catch(err => console.error("hata", err));

    });

    $("#btn-send-message-caller-client").click(function () {
        const message = "hello world";

        connection.invoke(broadcastMessageToCallerClient, message).catch(err => console.error("hata", err));

    });

    $("#btn-send-message-other-clients").click(function () {
        const message = "hello world";

        connection.invoke(broadcastMessageForOtherClients, message).catch(err => console.error("hata", err));

    });

    $("#btn-send-message-special-clients").click(function () {
        const message = "hello world";
        const connectionId = $("#connectionId").val();
        connection.invoke(broadcastMessageForSpecialClient, connectionId, message).catch(err => console.error("hata", err));

    });

    const span_connected_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClient, (count) => {
        span_connected_client_count.text(count);
        console.log("Toplam user count : " + count);
    });


    connection.on(receiveMessageForAllClientClientMethodCall, (message) => {
        console.log("Gelen Mesaj : " + message);
    });

    connection.on(receiveMessageForCallerClient, (message) => {
        console.log("(Caller)Gelen Mesaj : " + message);
    });

    connection.on(receiveMessageForOtherClients, (message) => {
        console.log("(Other)Gelen Mesaj : " + message);
    });

    connection.on(receiveMessageForSpecialClient, (message) => {
        console.log("(Special)Gelen Mesaj : " + message);
    });

    function start() {
        connection.start().then(() => {
            console.log("Hub ile bağlantı kuruldu");
            $("#div-connection-id").html(`Connection Id : ${connection.connectionId}`);
        });
    }

    try {
        start();
    } catch (e) {
        console.log(e.message)
        setTimeout(() => start(), 5000)
    }
});