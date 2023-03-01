new Vue({
    el: '#app',
    data: () => ({
        nextLaunch:{},//prochaine lancement {object]
        nextLaunchDate:'', // date prochaine lancement format dd/mm/yyyy
        updateNextLaunchTmier:0, // décompte en seconde mis à jour en temps réel
        filterVal:'', // valeur du filtre true | false | ''
        pastLauch:[], // les derniers lancements
    }),
    created(){ //une fois créé, on récupére les données
        fetch('https://api.spacexdata.com/v3/launches/next')
            .then((res) => res.json())
            .then(next => {
                this.nextLaunch = next
                now = new Date().getTime()
                this.updateNextLaunchTmier = this.nextLaunch.launch_date_unix - Math.floor(now/1000)
                d = new Date(this.nextLaunch.launch_date_unix);
                this.nextLaunchDate = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()
            }).catch(err => console.log(err.message))
        fetch('https://api.spacexdata.com/v3/launches/past')
            .then(async response => {
                //fonction async et await pour attendre le retour de la requete
                const data = await response.json();
                // Vérifier s'il y a d'éventulles erreurs
                if (!response.ok) {
                    // Message d'erreur
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.pastLauch = data; // initialise les données des derniers lancements
            })
            .catch(err => console.log(err.message))
            this.updateNext() // appele le compte à rebour
    },
    methods:{
        setFilter(event){//recupere la valeur du filtre une fois choisi une option 
            this.filterVal = event.target.value
        },
        updateNext(){// met à jour le compte à rebour
            setTimeout(()=>{
                this.updateNextLaunchTmier--;
                this.updateNext();
            },1000)
        }
    },
    computed:{
        /* fonction faisant le filtre sur les derniers lancements.
        ils sont ordonnés par date de lancement (launch_date_unix en ms),
        date le plus récent,
        la fonction permet aussi de filter les lancements en fonction
        du succès de l'opération (launch.launch_success : true | false)
        */
        getTenLastsLaunchs(){
            
            this.pastLauch = this.pastLauch.sort((a, b) => b.launch_date_unix - a.launch_date_unix)
            if(this.filterVal == '') return this.pastLauch
            else{
                this.filterVal = this.filterVal == 'true' ? true : false 
                return this.pastLauch.filter(
                    (launch) => (launch.launch_success === this.filterVal)
                )
            }
        }
    },
    vuetify: new Vuetify(),
})