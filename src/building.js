export default {
    'resedential': () => {
        return {
            id: 'resedential',
            height: 1,
            updated: true,
            update: function () {
                if (Math.random() < 0.1) {
                    if (this.height < 5) {
                        this.height += 1;
                        this.updated = true;
                    }
                }
            }
        }
    },
    'commercial': () => {
        return {
            id: 'commercial',
            height: 1,
            updated: true,
            update: function () {
                if (Math.random() < 0.1) {
                    if (this.height < 5) {
                        this.height += 1;
                        this.updated = true;
                    }
                }
            }
        }
    },
    'industrial': () => {
        return {
            id: 'industrial',
            height: 1,
            updated: true,
            update: function () {
                if (Math.random() < 0.1) {
                    if (this.height < 5) {
                        this.height += 1;
                        this.updated = true;
                    }
                }
            }
        }
    },
    'road': () => {
        return {
            id: 'road',
            height: 1,
            updated: true,
            update: function () {
                this.updated = false;
            }
        }
    }
}