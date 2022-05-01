const { default: axios } = require('axios');
const table = require('cli-table');
const config = require("./config.json");

axios({
    url: config.url + "/api/client",
    method: "GET",
    headers: {
        'Authorization': 'Bearer ' + config.clientAPI,
        'Content-Type': 'application/json',
    }
}).then((response) => {
    let servers = response.data.data.map(server => { return server.attributes; });

    const tableData = new table({
        head: ['Index', 'Server Name', 'Server ID', 'Node'],
        colWidths: [10, 25, 14, 10]
    });

    servers.map((server, index) => {
        tableData.push([index, server.name, server.uuid.split('-')[0], server.node]);
    });

    console.log(tableData.toString());
});