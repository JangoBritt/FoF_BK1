// function getRandomString(length) {
//     let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
// }
// let result = "";

// console.time("Template Literals");
// for (let i = 0; i < 1000000; i++) {
//     let str1 = getRandomString(5);
//     let str2 = getRandomString(5);
//     let str3 = getRandomString(5);
//     let str4 = getRandomString(5);
//     let str5 = getRandomString(5);
//     result = `${str1}${str2}${str3}${str4}${str5}`;
// }
// console.timeEnd("Template Literals");

// console.time("Plus Operator");
// for (let i = 0; i < 1000000; i++) {
//     let str1 = getRandomString(5);
//     let str2 = getRandomString(5);
//     let str3 = getRandomString(5);
//     let str4 = getRandomString(5);
//     let str5 = getRandomString(5);
//     result = str1 + str2 + str3 + str4 + str5;
// }
// console.timeEnd("Plus Operator");

// console.time("String.concat");
// for (let i = 0; i < 1000000; i++) {
//     let str1 = getRandomString(5);
//     let str2 = getRandomString(5);
//     let str3 = getRandomString(5);
//     let str4 = getRandomString(5);
//     let str5 = getRandomString(5);
//     result = str1.concat(str2, str3, str4, str5);
// }
// console.timeEnd("String.concat");
// console.log(result)

import { ScoreboardIdentity, ScoreboardScoreInfo, system, world } from "@minecraft/server"
import { bridge } from "../addons"

import { bridgeDirect, database } from "../addons"
// const hello = database.makeTable("something")
// console.log("here")
// hello.set("hola", "8976787")
// system.run(()=>{
//     for (const entry of bridge.playerList)
//         console.log(entry.name)
// })

// system.afterEvents.scriptEventReceive.subscribe(e=>{
//     const scoreboard = world.scoreboard.getObjective("esploratori:kill_counter");

//     // const scoreboardId = this.#score_list.get(playerId);
//     // const scoreboardIdentity = world.scoreboard.getParticipants().find(s => s.id === scoreboardId); // get the actual identity object, this is crazy stupid

//     if (scoreboard) {
//         for (const { participant, score } of scoreboard.getScores().sort(s => s.score).slice(0, 10)) {
//             print(participant.displayName)
//             print(participant.type)
//             print(score.toString())
//             // print(participant.getEntity().name)
//         }
//     } 
// })



world.afterEvents.worldInitialize.subscribe(e=>{
    world.getDimension("overworld").runCommand(`scriptevent esploratori:disable_commands ${JSON.stringify({ options: { excludeTags:["esploratori:admin"]}})}`)
    console.info("Initialize")
})

// bridge.bedrockCommands.registerCommand("testing", ()=>{
//     const scoreboard = world.scoreboard.getObjective("money");

//     // const scoreboardId = this.#score_list.get(playerId);
//     // const scoreboardIdentity = world.scoreboard.getParticipants().find(s => s.id === scoreboardId); // get the actual identity object, this is crazy stupid

//     // if (scoreboard) {
//     //     for (const { participant, score } of scoreboard.getScores().sort(s => s.score).slice(0, 10)) {
//     //         print(participant.displayName)
//     //         print(participant.type)
//     //         print(participant.getEntity().name)
//     //     }
//     // }
//     // world.getAllPlayers().forEach(p => {
//     //     console.log("yeah"+p)
//     //     console.log(JSON.stringify(p.scoreboardIdentity))
//     //     const identity = world.scoreboard.getParticipants().find(s=>s.id === p.scoreboardIdentity.id)
//     //     console.log("scporp.scoreboardIdentity.ide " + world.scoreboard.getObjective("money").getScore(identity))
//     // })
// })
bridge.events.bridgeInitialize.subscribe((e)=>{
    e.registerAddition("discord_direct")
})

bridgeDirect.events.directInitialize.subscribe(e=>{
    console.log("Direct initialized")
    bridgeDirect.sendMessage("hola!!!")
})
console.log("running test")

import { http, HttpRequest, HttpRequestMethod } from "@minecraft/server-net"
class Requests {
    static max_attempts = 5;
    static min_timeout = 5; //0.25s
    static timeout = 1;
    /**@returns {Promise<HttpResponse|{ping:number}|undefined>}*/
    static async request(url, headers = {}, method, body) {
        const req = new HttpRequest(url);
        req.setMethod(method);
        for (const key in headers) {
            req.addHeader(key, headers[key]);
        }
        if (body) {
            req.setBody(body);
        }
        let timeout = this.timeout;
        let sleep_time = this.min_timeout
        for (let n = 0; n < this.max_attempts; n++) {
            req.setTimeout(timeout); //we update this later on
            const start = Date.now();
            const res = await http.request(req).catch(null);
            const ping = Date.now() - start;
            if (res && res.status > 100 && res.status < 1000) {
                res.ping = ping;
                return res;
            }
            await sleep(sleep_time);
            sleep_time *= 2;
            timeout += 1;
        }
        return {};
    }

    /**@returns {Promise<HttpResponse|{ping:number}|undefined>}*/
    static async get(url, headers) {
        return this.request(url, headers, HttpRequestMethod.Get);
    }

    /**@returns {Promise<HttpResponse|{ping:number}|undefined>}*/
    static async post(url, headers, body) {
        return this.request(url, headers, HttpRequestMethod.Post, body);
    }
}
// Requests.get("http://localhost.esploratori.space:8000/resources/QqbBocHzYHq2D0INvcVFyw", { "authorization":"B87g6wJ0uFlNNoQ"}).then(res=>{
//     console.log("res" + res.status)
//     console.log("body" + res.body)
// })