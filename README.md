# Extravaganza Management

We are going to change the world.

## Workflow/Ideas

We have two major options here, either use id scanning at the door/in the TLC queue or enter ticket numbers to check people in.

no idea what scanner workflow would look like but numbers is something like:
* Enter full name with ticket numbers when we give them away at the booth
* at checkin table/TLC queue there is a guy with the app open who enters the ticket number and then boom you are checked in
* attendees keep tickets, can do the coatcheck with the same ticket with the number, and we get more stamps?? yeah need stamps
* use ticket to get coat back, but can use name lookup because we have the name from ticket distro
* have fun

Maybe increment ticket number at ticket distro page but also maybe too much work to manually
keep track to ensure that we have the tickets in order
Or maybe just have ticket guys write number on ticket and generate on the site

poll for user interest in using id cards - might be too establishment/corpo

## TODO

* coat check
* ticket distro
    * fast pass
    * booth reservation
    * regular ticket

## GOALS

* checkin - used at checkin desk and by goons on phones in TLC
    * field to enter ticket number
        * when entering number check if exists, check if already checked in, check is has name
    * if has no name, display field for name
    * name is saved with user
* coat - used at coat check desk
    * field to enter ticket number to check coat
        * generates coat check number, guy takes coat to hook
    * field to enter ticket number or name to checout coat
        * displays coat check number, guy goes to get coat
* ticket - used at ticket table in SAC 
    * field for ticket number and name
        * name field is optional so we can give multiple
    * bulk ticket option for giving to people for CLP groups
    * generates ticket in db
* counter - used by traffic moniter goons and maybe int TLC to know when to send people over
    * buttons to increment and decrement
    * sync number of people
    * display number of people checked in

## Development

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev:open
```

## Building

```bash
npm run build
```

You can preview the production build with `npm run preview`.

