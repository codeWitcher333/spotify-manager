let userAccessToken = '';
let userId = '';
let savedPlaylistId = '';

const clientId = process.env.REACT_APP_CLIENT_ID;
if(!clientId) console.log('API Key was not provided');

const redirectUrl = 'http://localhost:3000/';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private playlist-modify-public playlist-read-private&redirect_uri=${redirectUrl}`;


const Spotify = {

    getAccessToken(){

        return new Promise(res => {

            if(userAccessToken) return  res(userAccessToken);

            const catchedData = window.location.href.match(/access_token=([^&]*).*expires_in=([^&]*)/);

            if(catchedData && catchedData[1] && catchedData[2]){

                const [token,expTime] = [catchedData[1],catchedData[2]];
                userAccessToken = token;
                window.setTimeout(() => userAccessToken = '',expTime * 1000);
                window.history.pushState('Access Token', null, '/');
                res(userAccessToken);
            }
            else{

                window.location = authUrl;
            }

        })
    },
    filterTrackData(track){

        return {

            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            preview: track.preview_url
        }
    },

    searchTracks(term){

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{

            headers: {Authorization: `Bearer ${userAccessToken}`}
        })
        .then(response => {

            if(response.ok) return response.json();
            throw Error('Request failed!');
        }).catch(error => console.log(error.message))
        .then(jsonResponse => jsonResponse.tracks.items.map(track =>  Spotify.filterTrackData(track)));
    },
    getUserId(){

        if(userId) return new Promise(res => res(userId));
        return fetch('https://api.spotify.com/v1/me',{

                headers: {Authorization: `Bearer ${userAccessToken}`}
            })
            .then(response => {

                if(response.ok) return response.json();
                throw Error('Request failed!');
            },error => console.log(error.message))
            .then(jsonResponse => userId = jsonResponse.id)
    },
    updateOrGetPlaylists(method,playlistId,playlistName){

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`+(playlistId?`/${playlistId}`:''),{

            method: method,
            headers: {Authorization: `Bearer ${userAccessToken}`},
            body: playlistName && JSON.stringify({name: playlistName})
        })
        .then(response => {

            if(response.ok) return (method !== 'PUT' && response.json());
            throw Error('Request failed!');
        },error => console.log(error.message))
        .then(jsonResponse => {

            if(jsonResponse) {

                if(method === 'POST') savedPlaylistId = jsonResponse.id;
                else return jsonResponse.items.map(playlist => {

                    return {

                        id: playlist.id,
                        name: playlist.name
                    }
                });
            }
        })
    },
    updateOrGetTracks(method,playlistId,urisArr){

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{

            method: method,
            headers: {Authorization: `Bearer ${userAccessToken}`},
            body: urisArr && JSON.stringify({uris: urisArr})
        })
        .then(response => {

            if(response.ok) return (method === 'GET' && response.json());
            throw Error('Request failed!');
        },error => console.log(error.message))
        .then(jsonResponse => {

            if(jsonResponse){

                return jsonResponse.items.map(item =>  Spotify.filterTrackData(item.track));
            }
        })
    },
    addPlaylist(method,localPlaylistId,playlistName){

        return Spotify.updateOrGetPlaylists(method,localPlaylistId,playlistName);
    },
    addTracks(method,localPlaylistId,trackArr){

        return Spotify.updateOrGetTracks(method,localPlaylistId,trackArr)
                      .then(() => method ==='POST'?'Playlist created!':'Playlist updated!');
    },
    getPlaylists(){

        return Spotify.getAccessToken()
                      .then(Spotify.getUserId)
                      .then(() => Spotify.updateOrGetPlaylists('GET'));
    },
    getTracks(playlistId){

        return Spotify.getAccessToken()
                      .then(Spotify.getUserId)
                      .then(() => Spotify.updateOrGetTracks('GET',playlistId));
    },
    savePlaylist(playlistName,localPlaylistId,urisArr){

        if(playlistName && urisArr){

            const putOrPost = localPlaylistId?'PUT':'POST';

            return Spotify.getAccessToken()
                          .then(Spotify.getUserId)
                          .then(() => Spotify.addPlaylist(putOrPost,localPlaylistId,playlistName))
                          .then(() => urisArr.length?Spotify.addTracks(putOrPost,localPlaylistId || savedPlaylistId,urisArr):'Empty Playlist Created!');
        }
        else return new Promise(res => res('Choose Correct Playlist Name'));
    }
}

export default Spotify;