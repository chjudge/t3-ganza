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

* checkin - used at checkin desk in TLC
    * fast pass field
    * field to enter name
    * field to say whether they need a checked coat
    * if coat_check then generate number
* coat - used at coat check desk
    * field to enter coatcheck number to indicate coat is checked
    * field to enter coatcheck number to indicate coat is taken back
    * field to enter name to search for coat check number
* counter - used by traffic moniter goons and maybe in TLC to know when to send people over
    * buttons to increment and decrement
    * sync number of people
    * display number of people checked in
* admin - dashboard ish to display live data from the db

## Next steps
* Validate name DONE
    * Validation messages DONE
* Counter page DONE, make client side responsive ish
* Coat check page DONE
    * Search by number DONE
    * checkout button DONE
* dashboard to view data
* Auth
    * every page requires you to be logged in
* format nice
* prizes page - randomly choose someone

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

