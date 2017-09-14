function TrainingGame(winNum=10, difficulty=battlesWon) {
    that = this;
    this.joffreySlaps = 0;
    this.goodieSlaps = 0;

    this._joffSlapped = function () {
        that.joffreySlaps++;
    };

    this._goodieSlapped = function () {
        that.goodieSlaps++;
    };

    this._winChecker = function () {
        if (that.joffreySlaps === winNum) {
            return true;
        } else {
            return false;
        }
    };

    this._lossChecker = function () {
        if (that.goodieSlaps === winNum) {
            return true;
        } else {
            return false;
        }
    };

    this.difficulty = 5 - difficulty;
    this.time = this.difficulty * 10;
    this.timePerJoffrey = this.time / (10 + this.difficulty * 2);
    this.timePerGoodie = this.time / (20 - this.difficulty * 3);
    this.timeLeft = this.time;
}

    