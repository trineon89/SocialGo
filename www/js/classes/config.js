class Config {
    constructor(storage) {
        this._storage = storage;
        this.load();
        this._container = document.querySelector('#overlay');
        this._html='<div class="innerConfig">\
            <div id="backhandler" class="backicon"></div>\
            <div class="configlistitem">Poubelle</div>\
            <div class="configlistitem">Bus</div>\
            <div id="cfg-show-my-profile" class="configlistitem">Mäi Profil</div>\
            <div class="configlistitem">Meng Punkten</div>\
            </div>';
    }
    show() {
        this._container.innerHTML=this._html;
        this._container.style.display="block";
		this.init();
    }
    init() {
        let that=this;
        $('#backhandler').on('click', function() { that._container.style.display="none"; });
        $('#cfg-show-my-profile').on('click', function() { profile.show('config'); });
    }
    load() {
        this._config=JSON.parse(this._storage.getItem('config'));
        if (this._config==null) this._config={};
    }
    save() {
        this._storage.setItem('config',JSON.stringify(this._config));
    }
    getId() {
        if (this._config == null) return false;
        if (this._config.id == null) return false;
        return this._config.id;
    }
    setId(id) {
        this._config.id=id;
        this.save();
    }
    getName() {
        if (this._config == null) return false;
        if (this._config.name == null) return false;
        return this._config.name;
    }
    setName(name) {
        this._config.name=name;
        this.save();
    }
    getSurname() {
        if (this._config == null) return false;
        if (this._config.surname == null) return false;
        return this._config.surname;
    }
    setSurname(surname) {
        this._config.surname=surname;
        this.save();
    }
    getEmail() {
        if (this._config == null) return false;
        if (this._config.email == null) return false;
        return this._config.email;
    }
    setEmail(email) {
        this._config.email=email;
        this.save();
    }
    getHouse() {
        if (this._config == null) return false;
        if (this._config.house == null) return false;
        return this._config.house;
    }
    setHouse(house) {
        this._config.house=house;
        this.save();
    }
    getShowOnline() {
        if (this._config == null) return false;
        if (this._config.showonline == null) return false;
        return this._config.showonline;
    }
    setShowOnline(online) {
        this._config.showonline=online;
        this.save();
    }
}