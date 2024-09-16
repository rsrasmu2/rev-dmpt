class VehicleSettings {
    constructor(trim, paint, wheels, interior, msrp, session_id) {
        this.trim = trim;
        this.paint = paint;
        this.wheels = wheels;
        this.interior = interior;
        this.msrp = msrp;
        this.session_id = session_id;
    }
}

class SessionId {
    constructor(session_id) {
        this.session_id = session_id;
    }
}

function start() {
    console.log(process.env.INVOKE_URL);
    tryGet(1);
}

async function tryGet(session_id) {
    const url = `${process.env.INVOKE_URL}/get-vehicle-settings`;

    const body = JSON.stringify(new SessionId(session_id));

    console.log("Get: " + body);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            },
            body: body
        });

        if (!response.ok) {
            throw new Error(`Failed to retrieve data: ${response.statusText}`);
        }

        console.log(`Completed: ${response.status}`);
        const data = await response.json();
        const settings = data.Item;
        console.log(`Settings: ${settings.trim}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Call start function when the script loads
start();