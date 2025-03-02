import Lobby from "./views/LobbyView.js";
import Game from "./views/GameView.js";
import Tournament from "./views/TournamentView.js";
import Stats from "./views/StatsView.js";


async function history_and_router(view_id)
{
    //console.log("History.state before: ", history.state);
    history.pushState({view : view_id}, null, null);
    //console.log("History.state after: ", history.state);
    router(null);
};

async function router(path)
{
    const view_obj_arr = [
        {id: "lobby_view", view: Lobby},
        {id: "game_view", view: Game},
        {id: "tournament_view", view: Tournament},
        {id: "stats_view", view: Stats}
    ];

    var view_match_map, match, view;

    if (path === null)
        view_match_map = view_obj_arr.map(view_obj => {return {view_obj: view_obj, is_match: history.state !== null && history.state.view === view_obj.id};});
    else
        view_match_map = view_obj_arr.map(view_obj => {return {view_obj: view_obj, is_match: path === view_obj.id};});

    match = view_match_map.find(potential_match => potential_match.is_match);

    if (!match)
        match = {view_obj: view_obj_arr[0], is_match: true};

    view = new match.view_obj.view();

    await view.goToView();
};

window.onpopstate = async function()
{
    router(null);
};


//---------------------------------------------------------- Listeners ------------------------------------------------------------------------------


async function view_reference_listener(event)
{
    if (event.target.matches("[view-reference]"))
    {
        event.preventDefault();
        history_and_router(event.target.id);
    }
}

async function sub_view_reference_listener(event)
{
    if (event.target.matches("[sub-view-reference]"))
    {
        event.preventDefault();
        router(event.target.id);
    }
}

async function authentication_listener(event)
{
    var successful;

    if (event.target.id === "login" || event.target.id === "register")
    {
        var user, pwd;

        user = document.getElementById("auth_user").value,
        pwd = document.getElementById("auth_pwd").value;

        // Handle original request
        if (event.target.id === "login")
            successful = await login_func(user, pwd);
        else
            successful = await register_func(user, pwd);
        
        // On successful register try login
        if (event.target.id === "register" && successful)
            successful = await login_func(user, pwd);

        if (successful)
            router(null);
    }

    else if (event.target.id === "logout")
    {
        successful = await logout_func();
        if (successful)
            router(null);
        else
        {
            var view = new Lobby;
            return await view.goToError();
        }
    }
}

async function play_game_listener(event)
{
    if (event.target.id === "play_game")
    {
        var classes_arr = Array.from(event.target.classList)
        var game_class = {type_count: 0, mode_count: 0, t_count: 0, unknown: false};

        classes_arr.reduce(check_game_class, game_class);

        console.log(game_class);

        if (game_class.unknown ||
            game_class.type_count !== 1 ||
            game_class.mode_count !== 1 ||
            game_class.t_count !== 1 ||
            (game_class.mode==='2v2' && game_class.t !== null))
            return console.log('Incorrect game classes!');


        event.preventDefault();
        var game_view = (game_class.t === null) ? new Game : new Tournament;
        
        var player_left1 = game_class.mode === "1v1" ? get_player_name('left-select') : get_player_name('left-select1');
        var player_right1 = game_class.mode === "1v1" ? get_player_name('right-select') : get_player_name('right-select1');
        var player_left2 = game_class.mode === "1v1" ? null : get_player_name('left-select2');
        var player_right2 = game_class.mode === "1v1" ? null : get_player_name('right-select2');

        if (game_class.type === 'pong')
            game_view.play_pong(player_left1, player_left2, player_right1, player_right2, game_class.t);
        else
            game_view.play_snek(player_left1, player_left2, player_right1, player_right2, game_class.t);
    } 
}

async function create_tournament_listener(event)
{
    if (event.target.id === "create_tournament")
    {
        var classes_arr = Array.from(event.target.classList)

        if (classes_arr.length != 1 || (classes_arr[0] != 'pong' && classes_arr[0] != 'snek'))
            return console.log('Incorrect tournament classes!');

        try
        {
            const response = await fetch("pong_api/pong_create_tournament/", {
                method: "POST",
                headers: {'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken')},
                body: JSON.stringify({tournament_type: classes_arr[0]})});
            if (!response.ok)   
                throw new Error("Failed to create tournament");
        }
        catch (err)
        {
            console.error(err.message);
            return document.querySelector("#content").innerHTML = `Something went terribly worng!`;
        }
        router("tournament_view");
    }
}

function content_loaded_listener()
{
    document.body.addEventListener("click", e => view_reference_listener(e));
    document.body.addEventListener("click", e => sub_view_reference_listener(e));
    document.body.addEventListener("click", e => authentication_listener(e));
    document.body.addEventListener("click", e => play_game_listener(e));
    document.body.addEventListener("click", e => create_tournament_listener(e));
    
    router(null);
}

document.addEventListener("DOMContentLoaded", content_loaded_listener());


function check_game_class(accumulator, item)
{
    if (item === "pong" || item === "snek")
    {
        accumulator.type_count += 1;
        accumulator.type = item;
    }
    else if (item === "1v1" || item === "2v2")
    {
        accumulator.mode_count += 1;
        accumulator.mode = item;
    }
    else if (item === "T0" || item === "T1" || item === "T2"|| item === "T3")
    {
        accumulator.t_count += 1;
        accumulator.t = (item === 'T0' ? null : (item === 'T1' ? 1 : (item === 'T2' ? 2 : 3)));
    }
    else
        accumulator.unknown = true;

    return accumulator;
}


function get_player_name(id)
{
    var player_select = document.getElementById(id);
    return player_select.options[player_select.selectedIndex].text;
}