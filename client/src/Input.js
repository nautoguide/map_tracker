import Queueable from "@nautoguide/ourthings/Queueable";

// Work around the URL params missing via this function
(function (w) {

    w.URLSearchParams = w.URLSearchParams || function (searchString) {
        const self = this;
        self.searchString = searchString;
        self.get = function (name) {
            const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
            if (results == null) {
                return null;
            }
            else {
                return decodeURI(results[1]) || 0;
            }
        };
    }

})(window);

class Input extends Queueable {
    onchange(pid, json, event) {
        if(json.hasOwnProperty('memoryGroup')) {
            const memoryCache = window.memory[json.memoryGroup] ? window.memory[json.memoryGroup].value : {};
            memoryCache[json.memoryName] = event.target.value;
            this.queue.setMemory(json.memoryGroup, memoryCache, 'Session');
        } else {
            this.queue.setMemory(json.memoryName, event.target.value, 'Session');
        }

        this.finished(pid, this.queue.DEFINE.FIN_OK);
    }

    initialiseFilterList(pid, json) {
        const filterList = [
            JSON.stringify({
                type: "json",
                data: "tracker_points",
                item: "attributes",
                filter: {
                    org_name: "Adventure Syndicate"
                }
            })
        ];

        const urlParams = new URLSearchParams(window.location.search);
        const categories = urlParams.get('categories');
        if (categories ) {
            window.memory.filters.value = categories.split(',');

            if (window.memory.filters.value.indexOf('school') < 0) {
                document.querySelector('#schoolsSVG').classList.add('hidden-svg');
            }

            if (window.memory.filters.value.indexOf('workplace') < 0) {
                document.querySelector('#workplaceSVG').classList.add('hidden-svg');
            }

            if (window.memory.filters.value.indexOf('individual/pair') < 0) {
                document.querySelector('#indSVG').classList.add('hidden-svg');
            }

            if (window.memory.filters.value.indexOf('team') < 0) {
                document.querySelector('#teamSVG').classList.add('hidden-svg');
            }
        }



        for(const value of window.memory.filters.value) {
            filterList.push(JSON.stringify({
                type: "json",
                data: "tracker_points",
                item: "attributes",
                join: "or",
                filter: {
                    category: value
                }
            }))
        }

        window.memory.filterList = filterList;
        this.finished(pid, this.queue.DEFINE.FIN_OK);
    }

    updateFilters(pid, json) {
        const index = window.memory.filters.value.indexOf(json.value);
        if(index > -1) {
            window.memory.filters.value.splice(index, 1)
        } else {
            window.memory.filters.value.push(json.value);
        }

        const filterList = [
            JSON.stringify({
                type: "json",
                data: "tracker_points",
                item: "attributes",
                filter: {
                    org_name: "Adventure Syndicate"
                }
            })
        ];

        for(const value of window.memory.filters.value) {
            filterList.push(JSON.stringify({
                type: "json",
                data: "tracker_points",
                item: "attributes",
                join: "or",
                filter: {
                    category: value
                }
            }))
        }

        window.memory.filterList = filterList;

        this.finished(pid, this.queue.DEFINE.FIN_OK);
    }

    submitMileage(pid, json) {
        console.log('Submitting');
        window.memory.mileageForm.value.distance *= 1609.344;
        const values = [
            {
                value: window.memory.mileageForm.schoolID,
                conditions: {
                    comparisonType: 'exists'
                },
            },
            {
                value: window.memory.mileageForm.riderName,
                conditions: {
                    comparisonType: 'exists',
                },
            },
            {
                value: window.memory.mileageForm.distance,
                conditions: {
                    comparisonType: 'number',
                }
            }
        ];

        let valid = true;
        for(let check of values) {
            if(!this.checkValidity(check.value, check.conditions)) {
                valid = false;
                break;
            }
        }

        if (valid) {
            this.queue.execute(json.name, json.json);
        }

        this.finished(pid, this.queue.DEFINE.FIN_OK);
    }

    checkValidity(value, json) {
        let valid = false;

        switch (json.comparisonType) {
            case 'type':
                valid = typeof value === json.type;
                break;
            case 'value':
                if(json.condition === '==') {
                    valid = value === json.value;
                } else {
                    valid = value === json.value;
                }
                break;
            case 'exists':
                valid = value !== '';
                break;
            case 'number':
                valid = isNaN(Number(value));
                break;
        }

        return valid;
    }
}

export default Input;