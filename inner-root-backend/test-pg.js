const { Client } = require('pg');

async function testAuth(password) {
    console.log(`Testing with password: ${password}`);
    const client = new Client({
        host: 'db.mldgwdhcxayvahthzqdn.supabase.co',
        port: 5432,
        user: 'postgres',
        password: password,
        database: 'postgres',
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log("Connection successful!");
        const res = await client.query("SHOW pgrst.jwt_secret;");
        console.log("Found Secret directly?: ", res.rows);
        await client.end();
        return true;
    } catch (e) {
        console.error("Failed:", e.message);
        return false;
    }
}

async function run() {
    const passwordsToTest = [
        'Wazir@150',
        '[Wazir@150]',
        '<Wazir@150>',
        'Wazir%40150',
        'postgres',
        'root',
        'password'
    ];

    for (const p of passwordsToTest) {
        if (await testAuth(p)) break;
    }
}

run();
