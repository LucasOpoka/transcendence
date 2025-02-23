
import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
    }

    async goToView()
    {
        try {var json = await this.fetchSessionData();}
        catch (err) {return;}

        var content = `
        
        <br>
            <label for="left-select"> Choose left player: </label>
            <select name="LeftPlayer" id="left-select">
            <option>${json.data["players"]["p1"]["name"]}</option>
            <option>${json.data["players"]["p2"]["name"]}</option>
            <option>${json.data["players"]["p3"]["name"]}</option>
            <option>${json.data["players"]["p4"]["name"]}</option>
            </select>

            <label for="right-select"> Choose right player: </label>
            <select name="RightPlayer" id="right-select">
            <option>${json.data["players"]["p1"]["name"]}</option>
            <option>${json.data["players"]["p2"]["name"]}</option>
            <option>${json.data["players"]["p3"]["name"]}</option>
            <option>${json.data["players"]["p4"]["name"]}</option>
            </select>
        </br>
        <br> <button id="play_game" class="1v1"> Play 1v1 pong </button> </br>

        <br></br>
        
        <br>
            <label for="left-select1"> Choose left player 1: </label>
            <select name="LeftPlayer1" id="left-select1">
            <option>${json.data["players"]["p1"]["name"]}</option>
            <option>${json.data["players"]["p2"]["name"]}</option>
            <option>${json.data["players"]["p3"]["name"]}</option>
            <option>${json.data["players"]["p4"]["name"]}</option>
            </select>

            <label for="right-select1"> Choose right player 1: </label>
            <select name="RightPlayer1" id="right-select1">
            <option>${json.data["players"]["p1"]["name"]}</option>
            <option>${json.data["players"]["p2"]["name"]}</option>
            <option>${json.data["players"]["p3"]["name"]}</option>
            <option>${json.data["players"]["p4"]["name"]}</option>
            </select>
        </br>

        <br>
            <label for="left-select2"> Choose left player 2: </label>
            <select name="LeftPlayer2" id="left-select2">
            <option>${json.data["players"]["p1"]["name"]}</option>
            <option>${json.data["players"]["p2"]["name"]}</option>
            <option>${json.data["players"]["p3"]["name"]}</option>
            <option>${json.data["players"]["p4"]["name"]}</option>
            </select>

            <label for="right-select2"> Choose right player 2: </label>
            <select name="RightPlayer2" id="right-select2">
            <option>${json.data["players"]["p1"]["name"]}</option>
            <option>${json.data["players"]["p2"]["name"]}</option>
            <option>${json.data["players"]["p3"]["name"]}</option>
            <option>${json.data["players"]["p4"]["name"]}</option>
            </select>
        </br>
        <br> <button id="play_game" class="2v2"> Play 2v2 pong </button> </br>
        `;

        this.setTitle("Game");
        this.unhideNavbar();
        await this.setContent(content);
    }

    async goToResult()
    {
        try {var json = await this.fetchSessionData();}
        catch(err) {return;}

        var game = json.data["games"][0];

        var l1, l2, r1, r2, score_str, score_arr;

        score_str = game["score"];
        score_arr = score_str.split(" - ");

        l1 = (score_arr[0] > score_arr[1]) ? game["winner_1"] : game["loser_1"];
        l2 = (score_arr[0] > score_arr[1]) ? game["winner_2"] : game["loser_2"];
        r1 = (score_arr[0] > score_arr[1]) ? game["loser_1"] : game["winner_1"];
        r2 = (score_arr[0] > score_arr[1]) ? game["loser_2"] : game["winner_2"];

        l1 = (l1 === null) ? "" : l1;
        l2 = (l2 === null) ? "" : l2;
        r1 = (r1 === null) ? "" : r1;
        r2 = (r2 === null) ? "" : r2;

        var content = `
        
        <button id="game_view" sub-view-reference> Go back </button>

        <br> Game completed! </br>
    
        ${l1}   ${l2}   ${score_str}    ${r1}   ${r2}
        `;

        this.setTitle("Game");
        this.unhideNavbar();
        await this.setContent(content);
    }


    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /*                                                                                                                                              */
    /*                                   ██████╗  ██████╗ ███╗   ██╗ ██████╗      ██████╗  █████╗ ███╗   ███╗███████╗                               */
    /*                                   ██╔══██╗██╔═══██╗████╗  ██║██╔════╝     ██╔════╝ ██╔══██╗████╗ ████║██╔════╝                               */
    /*                                   ██████╔╝██║   ██║██╔██╗ ██║██║  ███╗    ██║  ███╗███████║██╔████╔██║█████╗                                 */
    /*                                   ██╔═══╝ ██║   ██║██║╚██╗██║██║   ██║    ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝                                 */
    /*                                   ██║     ╚██████╔╝██║ ╚████║╚██████╔╝    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗                               */
    /*                                   ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝                               */                                                           
    /*                                                                                                                                              */
    /* -------------------------------------------------------------- Main game function ---------------------------------------------------------- */
    
    async play_pong(player_left1, player_left2, player_right1, player_right2, tournament)
    {
        var game_data = {};
    
        game_data.player_left1 = player_left1;
        game_data.player_left2 = player_left2;
        game_data.player_right1 = player_right1;
        game_data.player_right2 = player_right2;
        game_data.tournament = tournament;

        // Set canvas
        await this.goToGameView();
    
        game_data.canvas = document.getElementById('pong');
        game_data.context = game_data.canvas.getContext('2d');
        game_data.grid = 15;
        game_data.paddleHeight = game_data.grid * 5;
        game_data.maxPaddleY = game_data.canvas.height - game_data.grid - game_data.paddleHeight;
    
        game_data.paused = false;
        game_data.end = false;
        game_data.score = [0,0];
        game_data.max_score = 5;
    
        game_data.paddleSpeed = 6;
        game_data.ballSpeed = 7;
        game_data.requestId;
    
        if (game_data.player_left2 === null && game_data.player_right2 === null)
        {
            game_data.leftPaddle1 =
            {
                x: game_data.grid * 0,
                y: (game_data.canvas.height - game_data.paddleHeight) / 2,
                width: game_data.grid,
                height: game_data.paddleHeight,
                dy: 0
            };
        
            game_data.rightPaddle1 =
            {
                x: game_data.canvas.width - game_data.grid * 1,
                y: (game_data.canvas.height - game_data.paddleHeight) / 2,
                width: game_data.grid,
                height: game_data.paddleHeight,
                dy: 0
            };
        }
        else
        {
            game_data.leftPaddle1 =
            {
                x: game_data.grid * 0,
                y: (game_data.canvas.height - game_data.paddleHeight) / 3,
                width: game_data.grid,
                height: game_data.paddleHeight,
                dy: 0
            };
        
            game_data.rightPaddle1 =
            {
                x: game_data.canvas.width - game_data.grid * 1,
                y: (game_data.canvas.height - game_data.paddleHeight) / 3,
                width: game_data.grid,
                height: game_data.paddleHeight,
                dy: 0
            };

            game_data.leftPaddle2 =
            {
                x: game_data.grid * 0,
                y: (game_data.canvas.height - game_data.paddleHeight) / 3 * 2,
                width: game_data.grid,
                height: game_data.paddleHeight,
                dy: 0
            };
        
            game_data.rightPaddle2 =
            {
                x: game_data.canvas.width - game_data.grid * 1,
                y: (game_data.canvas.height - game_data.paddleHeight) / 3 * 2,
                width: game_data.grid,
                height: game_data.paddleHeight,
                dy: 0
            };
        }

    
        game_data.ball =
        {
            x: game_data.canvas.width / 2,
            y: game_data.canvas.height / 2,
            width: game_data.grid,
            height: game_data.grid,
            resetting: false,
            dx: game_data.ballSpeed,
            dy: -game_data.ballSpeed
        };
    
    
        document.addEventListener('keydown', e => this.keydown_listener(e, game_data));
        document.addEventListener('keyup', e => this.keyup_listener(e, game_data));
    

        game_data.requestId = window.requestAnimationFrame(this.pong_loop.bind(this, game_data));
    }


    /* ------------------------------------------------------------ Game loop ------------------------------------------------------------ */

    async pong_loop(game_data)
    {
        game_data.canvas.focus();
    
        game_data.context.clearRect(0, 0, game_data.canvas.width, game_data.canvas.height);
        game_data.context.fillStyle = 'black';
        game_data.context.fillRect(0, 0, game_data.canvas.width, game_data.canvas.height);
        
        game_data.context.textAlign = 'center', game_data.context.font = '50px "Press Start 2P", Arial, sans-serif', game_data.context.fillStyle = 'white';
        game_data.context.fillText(game_data.score[0] + '  ' + game_data.score[1], game_data.canvas.width / 2, game_data.canvas.height * 0.2);
    
        // Move paddles
        game_data.leftPaddle1.y = ((game_data.leftPaddle1.y + game_data.leftPaddle1.dy < game_data.grid) || (game_data.leftPaddle1.y + game_data.leftPaddle1.dy > game_data.maxPaddleY)) ? ((game_data.leftPaddle1.dy > 0) ? game_data.maxPaddleY : game_data.grid) : game_data.leftPaddle1.y + game_data.leftPaddle1.dy;
        game_data.rightPaddle1.y = ((game_data.rightPaddle1.y + game_data.rightPaddle1.dy < game_data.grid) || (game_data.rightPaddle1.y + game_data.rightPaddle1.dy > game_data.maxPaddleY)) ? ((game_data.rightPaddle1.dy > 0) ? game_data.maxPaddleY : game_data.grid) : game_data.rightPaddle1.y + game_data.rightPaddle1.dy;

        if (game_data.player_left2 !== null && game_data.player_right2 !== null)
        {
            game_data.leftPaddle2.y = ((game_data.leftPaddle2.y + game_data.leftPaddle2.dy < game_data.grid) || (game_data.leftPaddle2.y + game_data.leftPaddle2.dy > game_data.maxPaddleY)) ? ((game_data.leftPaddle2.dy > 0) ? game_data.maxPaddleY : game_data.grid) : game_data.leftPaddle2.y + game_data.leftPaddle2.dy;
            game_data.rightPaddle2.y = ((game_data.rightPaddle2.y + game_data.rightPaddle2.dy < game_data.grid) || (game_data.rightPaddle2.y + game_data.rightPaddle2.dy > game_data.maxPaddleY)) ? ((game_data.rightPaddle2.dy > 0) ? game_data.maxPaddleY : game_data.grid) : game_data.rightPaddle2.y + game_data.rightPaddle2.dy;
        }  

        // Draw paddles
        game_data.context.fillStyle = 'white';
        game_data.context.fillRect(game_data.leftPaddle1.x, game_data.leftPaddle1.y, game_data.leftPaddle1.width, game_data.leftPaddle1.height);
        game_data.context.fillRect(game_data.rightPaddle1.x, game_data.rightPaddle1.y, game_data.rightPaddle1.width, game_data.rightPaddle1.height);

        if (game_data.player_left2 !== null && game_data.player_right2 !== null)
        {    
            game_data.context.fillRect(game_data.leftPaddle2.x, game_data.leftPaddle2.y, game_data.leftPaddle2.width, game_data.leftPaddle2.height);
            game_data.context.fillRect(game_data.rightPaddle2.x, game_data.rightPaddle2.y, game_data.rightPaddle2.width, game_data.rightPaddle2.height);
        }
    
        // Move ball
        game_data.ball.x += game_data.ball.dx;
        game_data.ball.y += game_data.ball.dy;
    
        // Bounce ball from bottom and top walls
        if (game_data.ball.y < game_data.grid)
        {
            game_data.ball.y = game_data.grid;
            game_data.ball.dy *= -1;
        }
        else if (game_data.ball.y + game_data.grid > game_data.canvas.height - game_data.grid)
        {
            game_data.ball.y = game_data.canvas.height - game_data.grid * 2;
            game_data.ball.dy *= -1;
        }
    
        // Reset ball on score and timeout
        if ( (game_data.ball.x < 0 || game_data.ball.x > game_data.canvas.width) && !game_data.ball.resetting)
        {
            game_data.ball.resetting = true;
            if (game_data.ball.x > game_data.canvas.width)
                game_data.score[0]++;
            else
                game_data.score[1]++;

            setTimeout(this.resetBall.bind(this, game_data), 400);
        }
    
        // check to see if ball collision with paddle. if they do change x velocity
        if (this.collision(game_data.ball, game_data.leftPaddle1))
        {
            game_data.ball.dx *= -1;
            game_data.ball.x = game_data.leftPaddle1.x + game_data.leftPaddle1.width;
            game_data.ballSpeed += 1
        }
        else if (this.collision(game_data.ball, game_data.rightPaddle1))
        {
            game_data.ball.dx *= -1;
            game_data.ball.x = game_data.rightPaddle1.x - game_data.ball.width;
            game_data.ballSpeed += 1
        }

        if (game_data.player_left2 !== null && game_data.player_right2 !== null)
        {
            if (this.collision(game_data.ball, game_data.leftPaddle2))
            {
                game_data.ball.dx *= -1;
                game_data.ball.x = game_data.leftPaddle2.x + game_data.leftPaddle2.width;
                game_data.ballSpeed += 1
            }
            else if (this.collision(game_data.ball, game_data.rightPaddle2))
            {
                game_data.ball.dx *= -1;
                game_data.ball.x = game_data.rightPaddle2.x - game_data.ball.width;
                game_data.ballSpeed += 1
            }
        }
    

        // Draw ball
        game_data.context.fillRect(game_data.ball.x, game_data.ball.y, game_data.ball.width, game_data.ball.height);
    
        // Draw walls
        game_data.context.fillStyle = 'orange';
        game_data.context.fillRect(0, 0, game_data.canvas.width, game_data.grid);
        game_data.context.fillRect(0, game_data.canvas.height - game_data.grid, game_data.canvas.width, game_data.canvas.height);
    
        // Draw middle line
        for (let i = game_data.grid; i < game_data.canvas.height - game_data.grid; i += game_data.grid * 2)
            game_data.context.fillRect(game_data.canvas.width / 2 - game_data.grid / 2, i, game_data.grid, game_data.grid);
    

        // If game didnt end, request next frame, otherwise push game and show result
        if (!game_data.end)
        {
            game_data.requestId = window.requestAnimationFrame(this.pong_loop.bind(this, game_data));
        }
        else
        {
            window.cancelAnimationFrame(game_data.requestId);

            var score_str = game_data.score[0].toString() + " - " + game_data.score[1].toString();
            var winner1 = (game_data.score[0] > game_data.score[1]) ? game_data.player_left1 : game_data.player_right1;
            var loser1 = (game_data.score[0] > game_data.score[1]) ? game_data.player_right1 : game_data.player_left1;
            var winner2 = (game_data.player_left2 !== null && game_data.player_right2 !== null) ? ((game_data.score[0] > game_data.score[1]) ? game_data.player_left2 : game_data.player_right2) : null;
            var loser2 = (game_data.player_left2 !== null && game_data.player_right2 !== null) ? ((game_data.score[0] > game_data.score[1]) ? game_data.player_right2 : game_data.player_left2) : null;

            try
            {
                await this.push_game(game_data.tournament, winner1, winner2, loser1, loser2, score_str);
                await this.display_result(game_data.tournament);
                return;
            }
            catch (err) {return;}
        }
    }


    /* ------------------------------------------------------------ Key press listeners ------------------------------------------------------------ */

    async keydown_listener(e, game_data)
    {
        if (e.key === "ArrowUp")
            game_data.rightPaddle1.dy = -game_data.paddleSpeed;
        else if (e.key === "ArrowDown")
            game_data.rightPaddle1.dy = game_data.paddleSpeed;

        if (e.key === "w")
            game_data.leftPaddle1.dy = -game_data.paddleSpeed;
        else if (e.key === "s")
            game_data.leftPaddle1.dy = game_data.paddleSpeed;


        if (game_data.player_left2 !== null && game_data.player_right2 !== null)
        {
            if (e.key === "o")
                game_data.rightPaddle2.dy = -game_data.paddleSpeed;
            else if (e.key === "l")
                game_data.rightPaddle2.dy = game_data.paddleSpeed;
    
            if (e.key === "d")
                game_data.leftPaddle2.dy = -game_data.paddleSpeed;
            else if (e.key === "c")
                game_data.leftPaddle2.dy = game_data.paddleSpeed;
        }


        if (e.key === "Enter")
        {
            game_data.paused = !game_data.paused;
            if (game_data.paused)    
                window.cancelAnimationFrame(game_data.requestId);
            else
                game_data.requestId = window.requestAnimationFrame(this.pong_loop.bind(this, game_data));
        }
        if (e.key === "e")
            game_data.end = true;
    }

    async keyup_listener(e, game_data)
    {
        if (e.key === "ArrowUp" || e.key === "ArrowDown")
            game_data.rightPaddle1.dy = 0;

        if (e.key === "w" || e.key === "s")
            game_data.leftPaddle1.dy = 0;

        if (game_data.player_left2 !== null && game_data.player_right2 !== null)
        {
            if (e.key === "o" || e.key === "l")
                game_data.rightPaddle2.dy = 0;
    
            if (e.key === "d" || e.key === "c")
                game_data.leftPaddle2.dy = 0;
        }
    }


    /* ----------------------------------------------------------- Reset ball or end function ----------------------------------------------------------- */    

    resetBall(game_data)
    {
        if (game_data.score[0] === game_data.max_score || game_data.score[1] === game_data.max_score)
            game_data.end = true;
        else
        {
            game_data.ball.resetting = false;
            game_data.ball.x = game_data.canvas.width / 2;
            game_data.ball.y = game_data.canvas.height / 2;
            game_data.ballSpeed = 5;
        }
    }


    /* ---------------------------------------------------------- Post game handling functions ---------------------------------------------------------- */

    async push_game(tournament, w1, w2, l1, l2, score)
    {
        try
        {
            const response = await fetch("pong_api/pong_push_game/", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken')},
                    body: JSON.stringify({tournament: tournament, winner1: w1, winner2: w2, loser1: l1, loser2: l2, score: score})});
            if (!response.ok)
                throw new Error("Failed to push game");
        }
        catch (err)
        {
            console.error(err.message);
            await this.goToError();
            throw err;
        }
    };
    
    async display_result()
    {
        await this.goToResult();
    };


    /* -------------------------------------------------------------- Utils --------------------------------------------------------------- */

    collision(a, b)
    {
        return (a.x < b.x + b.width) && (a.x + a.width > b.x) && (a.y < b.y + b.height) && (a.y + a.height > b.y);
    }
}