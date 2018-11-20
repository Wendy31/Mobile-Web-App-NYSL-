var app = new Vue({
    el: '#app',
    data: {
        url: "https://api.jsonbin.io/b/5bf2d4ad80d3c667b1e99ccd",
        teams: [],
        results: [],
        matches: [], // all matches
        match: {}, // a specifc match
        page: 'indexPage',
        logInBtn: false,
        logOutBtn: false,
        member: false,
        teamInfo: [],
        homeTeam: [],
        awayTeam: [],


    },
    methods: {
        fetchData() {
            fetch(this.url, {
                    method: 'GET',
                })
                .then(function (data) {
                    return data.json();
                })

                .then(function (myData) {
                    app.teams = myData.teams;
                    app.results = myData.results;
                    app.matches = myData.matches;
                })
        },

        showPage(pageName) { //function to change id
            this.page = pageName;
        },

        showLogInMessage() {
            if (firebase.auth().currentUser == null) {
                alert("Please log in to access information");
                this.member = false;
            }
        },

        getTeamInfo(object) {
            this.teamInfo = object;

        },

        getMatchInfo(object) {
            this.match = object;
            for (var i = 0; i < this.teams.length; i++) {
                if (object.home_team_name == this.teams[i].name) {
                    this.homeTeam = this.teams[i]; // team info of the home team
                } else if (object.away_team_name == this.teams[i].name) {
                    this.awayTeam = this.teams[i]; // team info of the away team
                }
            }
        },

        login() {

            // https://firebase.google.com/docs/auth/web/google-signin

            // Provider
            var provider = new firebase.auth.GoogleAuthProvider();

            // How to Log In
            firebase.auth().signInWithPopup(provider);
            console.log("login");

        },

        logout() {
            firebase.auth().signOut().then(function () {
                console.log("logged out");
                this.loggedIn = true;
                this.loggedOut = false;

                // Sign-out successful.
            }, function (error) {
                console.log("not logged out");
                // An error happened.
            });

        },

        writeNewPost() {

            // https://firebase.google.com/docs/database/web/read-and-write

            // Values
            var textInput = document.getElementById("textInput").value;
            console.log(textInput);

            var userName = firebase.auth().currentUser.email;
            console.log(userName);

            // A post entry.

            var message = {
                messageText: textInput,
                name: userName,
            }

            console.log(message);

            // Get a key for a new Post.

            firebase.database().ref('myChat').push(message);

            //Write data

            console.log("write");

        },
        getPosts() {

            firebase.database().ref('myChat').on('value', function (data) {
                var posts = document.getElementById("posts");
                posts.innerHTML = "";

                var messages = data.val();

                for (var key in messages) {
                    var text = document.createElement("div");
                    var name = document.createElement("div");
                    var speechWrapper = document.createElement("div");
                    var bubble = document.createElement("div");
                    var element = messages[key];

                    text.className = "chatText";
                    name.className = "chatName";
                    name.innerHTML = firebase.auth().currentUser.displayName;
                    speechWrapper.className = "speechWrapper";
                    bubble.className = "bubble";

                    text.append(element.messageText);
                    bubble.append(name);
                    bubble.append(text);
                    speechWrapper.append(bubble);
                    posts.append(speechWrapper);

                }
            })
            console.log("getting posts");
        },

        changeLoginLogoutBtn() {
            var user = firebase.auth().currentUser;

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) { // User is signed in.
                    console.log("logged in")
                    app.logInBtn = false;
                    app.logOutBtn = true;
                    app.member = true;

                } else { // No user is signed in.
                    app.logInBtn = true;
                    app.logOutBtn = false;
                }
            });

        },

        scrollDown() {
            document.getElementById('posts').scrollTop = document.getElementById('posts').scrollHeight
        }

    },
    created() {
        this.getPosts();
        this.fetchData();
        this.changeLoginLogoutBtn();
    },

    updated() {
        this.scrollDown();
    }
})






// hide text first
//document.getElementById("more1").style.display = "none";
//document.getElementById("more2").style.display = "none";

// then function to 
function showReadMoreReadLess(id_dots, id_moreText, id_btnText) { // passing id names as params. 

    // apply function to selected IDs
    var dots = document.getElementById(id_dots);
    var moreText = document.getElementById(id_moreText);
    var btnText = document.getElementById(id_btnText);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

// no need to call function. Because called in HTML

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
