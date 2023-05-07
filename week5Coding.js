class NewHire {
    constructor(name, department) {
        this.name = name;
        this.department = department;  //spelling is crucial one spelling error can stop code from running.
    }

    describe() {
        return `${this.name} works in ${this.department}.`;
    }
}

class Location {
    constructor(name) {
        this.name = name;
        this.employee = []; //This creates a new empty array.
    }

    addEmployee (employee) {
      if (employee instanceof NewHire) {
        this.employee.push(employee);  //this puts new elements into the new array.
      } else {
        throw new Error(`You can only add an instance of NewHire. Argument is not a employee: ${employee}`);
      }
    }

    describe() {
        return `${this.name} has ${this.employee.length} employees.`;
    }
}

class Menu {
    constructor(){
        this.location = [];
        this.selectedLocation = null; //starts at no selection when null used.
    }

   start() {
    let selection = this.showMainMenuOptions();
    
    while (selection != 0) {       //this is the doing/action part of the menu
        switch (selection) {
            case '1':
                this.createLocation();
                break;
            case '2':
                this.viewLocation();
                break;
            case '3':
                this.deleteLocation();
                break;
            case '4':
                this.displayLocations();
                break;
            default:
                selection = 0;
        }
        selection = this.showMainMenuOptions();
    }
    
    alert('Goodbye!');
   }
    
   //This is the visual part, what the web shows.
   showMainMenuOptions() {
    return prompt(` 
    0) exit               
    1) create new location
    2) view location
    3) delete location
    4) display all location
    `)
   }

   showLocationMenuOptions(locationInfo) {
    return prompt(`
        0) back
        1) create employee
        2) delete employee
        -------------------
        ${locationInfo}
    `);
   }

   displayLocations() {
    let locationString = '';
    for (let i = 0; i < this.location.length; i++) {
        locationString += i + ') ' + this.location[i].name + '\n';
    }
    alert(locationString);
   }
   createLocation() {
    let name = prompt('Enter name for your location:');
    this.location.push(new Location(name));
   }

   viewLocation() {
    let index = prompt('Enter the index of the location you wish to view:');
    if (index > -1 && index < this.location.length) {
        this.selectedLocation = this.location[index];
        let description = 'Location: ' + this.selectedLocation.name + '\n';

        for(let i = 0; i < this.selectedLocation.employee.length; i++) {
            description += i + ') ' + this.selectedLocation.employee[i].name 
             + ' - ' + this.selectedLocation.employee[i].department + '\n';
        }

        let selection = this.showLocationMenuOptions(description);
        switch (selection) {
            case '1':
                this.createNewHire();
                break;
            case '2':
                this.deleteNewHire();
        }
    }
   }

   deleteLocation() {
    let index = prompt('Enter the index of the location you wish to delete:');
    if (index > -1 && index < this.location.length) {
        this.location.splice(index, 1);
        }
   }

   createNewHire() {
    let name = prompt('Enter name for new employee:');
    let department = prompt('Enter department for new employee');
    this.selectedLocation.employee.push(new NewHire(name, department));
   }

   deleteNewHire() {
    let index = prompt('Enter the index of the employee you wish to delete:');
    if (index > -1 && index < this.selectedLocation.employee.length) {
        this.selectedLocation.employee.splice(index, 1);
    }
   }
}

let menu = new Menu();   //must create an instance
menu.start();            //must invoke the function/menu to start working