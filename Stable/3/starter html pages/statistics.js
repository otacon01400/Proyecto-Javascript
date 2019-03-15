
//--------------------------------------------------------------------------
//----------------------------------------------------[VARIABLE DECLARATION]

  var statisticsObj = {
          "number_democrats":0,
          "number_republicans":0,
          "number_independents":0,
          "percentage_vote_party_democrats":0,
          "percentage_vote_party_republicans":0,
          "percentage_vote_party_independents":0,
          "most_missed_names":[],
          "most_missed_votes":[],
          "most_missed_percentage":[],
          "least_missed_names": [],
          "least_missed_votes":[],
          "least_missed_percentage":[],
          "least_loyal_names": [],
          "least_party_votes":[],
          "least_party_percentage":[],
          "most_loyal_names": [],
          "most_party_votes":[],
          "most_party_percentage":[],
          "attendanceCheck": false,
          "loyaltyCheck":false,
      };


//-----------------------------------------------------[VARIABLE DECLARATION]
//--------------------------------------------------------[VARIABLE SETUP]---


//--------------------------------------------------------[VARIABLE SETUP]---
//-----------------------------------------------------------[FUNCTIONS]-----

//let sortingAscendent = (a,b) => a > b ? 1 : b > a ? -1 : 0; No funciona
function sortingAscendent(a,b){ //Sort numbers from lowest to highest
  return a > b ? 1 : b > a ? -1 : 0;
}

//let sortingDescendent = (a,b) => a > b ? -1 : b > a ? 1 : 0; No funciona
function sortingDescendent(a,b){ //Sort numbers from highest to lowest
  return a > b ? -1 : b > a ? 1 : 0;
}

function getPartiesArray(members, length)
{
    var democrats = []; //     Storing all members with complete data from every party
    var republicans = []; //
    var independents = []; //

    members.map(function(x)
    {
      x.party == "D" ? democrats.push(x) : x.party == "R" ? republicans.push(x) : independents.push(x);
    });

    var partiesArray = [democrats,republicans,independents];
    return partiesArray;
}

function firstTableData(obj,d, r, i) //Fill statistics array with data required for first table.
{                                    //Number of members in each party and % of votes with his party
    var d_votes = 0;
    var r_votes = 0;
    var i_votes = 0;

    for (var x = 0; x < d.length; x++) d_votes += d[x].votes_with_party_pct;
    for (var y = 0; y < r.length; y++) r_votes += r[y].votes_with_party_pct;
    for (var z = 0; z < i.length; z++) i_votes += i[z].votes_with_party_pct;

    obj.number_democrats = d.length;
    obj.number_republicans = r.length;
    obj.number_independents = i.length;
    obj.percentage_vote_party_democrats = +((d_votes/d.length)).toFixed(2) || 0;
    obj.percentage_vote_party_republicans = +((r_votes/r.length)).toFixed(2) || 0;
    obj.percentage_vote_party_independents = +((i_votes/i.length)).toFixed(2) || 0;

    return obj;
}

function voteTablesData(members, length, dataSelector,pctSelector) //0 to get the least voted pct, 1 for the most
{
    var votesLsMixed;
    var votesLsArranged = [];
    var membersList = [];
    var minNumberValues = 0;
   var membersInIndex = [];

    if(dataSelector == "attendance")
    {
      votesLsMixed = members.map(function(x){return x.missed_votes_pct;});

      votesLsMixed = pctSelector ? votesLsMixed.sort(sortingAscendent) : votesLsMixed.sort(sortingDescendent); //Sort them depending on pctSelector value

      while(length*0.1 > votesLsArranged.length)
      {
        votesLsArranged.push(votesLsMixed[minNumberValues]);
        minNumberValues++;
      }

      for (var j = 0; j < votesLsArranged.length; j++) //Look for the member according to it's vote. Avoid getting the same member more than once storing it's index
      {                                              //If we have the 10%, stop looking for with "break"
        for(var u = 0; u < length; u++)
        {
          if(membersInIndex.indexOf(u) == -1 && votesLsArranged[j] == members[u].missed_votes_pct)
          {
            membersList.push(data.results[0].members[u]);
            membersInIndex.push(u);
            break;
          }
        }
      }
    }
    else if(dataSelector == "loyalty")
    {
      votesLsMixed = members.map(function(x){return x.votes_with_party_pct;});

      votesLsMixed = pctSelector ? votesLsMixed.sort(sortingDescendent) : votesLsMixed.sort(sortingAscendent); //Sort them depending on pctSelector value

      while(length*0.1 > votesLsArranged.length)
      {
        votesLsArranged.push(votesLsMixed[minNumberValues]);
        minNumberValues++;
      }

      for (var x = 0; x < votesLsArranged.length; x++) //Look for the member according to it's vote. Avoid getting the same member more than once storing it's index
      {                                              //If we have the 10%, stop looking for with "break"
        for(var y = 0; y < length; y++)
        {
          if(membersInIndex.indexOf(y) == -1 && votesLsArranged[x] == members[y].votes_with_party_pct)
          {
            membersList.push(data.results[0].members[y]);
            membersInIndex.push(y);
            break;
          }
        }
      }
    }

    return membersList;
}

function  statisticsSetup(statistics, dataSelector) //Store all data, now ready, in the statistics object
{
      const membersLength = data.results[0].members.length;           //shortcut for the json members list length
      const membersLs = data.results[0].members;                      //shortcut for the json members list
      const partiesArray = getPartiesArray(membersLs, membersLength);
      const democrats = 0;
      const republicans = 1;
      const independents = 2;

      var firstName;
      var middleName; //Nothing if NULL
      var lastName;
      var fullName;

      const leastMembers = voteTablesData(membersLs, membersLength, dataSelector, 0);
      const mostMembers = voteTablesData(membersLs, membersLength, dataSelector, 1);
      statistics = firstTableData(statistics, partiesArray[democrats],partiesArray[republicans], partiesArray[independents]); //Set data for first table here

      if(dataSelector == "attendance")
      {
        statistics.attendanceCheck = true;
        statistics.loyaltyCheck = false;

        leastMembers.map(function (x)                                     //Set data for second and third tables here by getting data from
        {                                                                 //the member's json to show, running all the array
          firstName = x.first_name;
          middleName = x.middle_name || ""; //Nothing if NULL
          lastName = x.last_name;
          fullName = [firstName,middleName,lastName];

          statistics.least_missed_names.push(fullName.join(" "));
          statistics.least_missed_votes.push(x.missed_votes);
          statistics.least_missed_percentage.push(x.missed_votes_pct);
        });
        mostMembers.map(function (x)
        {
          firstName = x.first_name;
          middleName = x.middle_name || "";
          lastName = x.last_name;
          fullName = [firstName,middleName,lastName];

          statistics.most_missed_names.push(fullName.join(" "));
          statistics.most_missed_votes.push(x.missed_votes);
          statistics.most_missed_percentage.push(x.missed_votes_pct);
        });
      }
      else if(dataSelector == "loyalty")
      {
        statistics.loyaltyCheck = true;
        statistics.attendanceCheck = false;

        leastMembers.map(function (x)                                     //Set data for second and third tables here by getting data from
        {
            firstName = x.first_name;
            middleName = x.middle_name || "";
            lastName = x.last_name;
            fullName = [firstName,middleName,lastName];
            statistics.least_loyal_names.push(fullName.join(" "));
            statistics.least_party_votes.push(x.total_votes);
            statistics.least_party_percentage.push(x.votes_with_party_pct);
        });
        mostMembers.map(function (x)
        {
            firstName = x.first_name;
            middleName = x.middle_name || "";
            lastName = x.last_name;
            fullName = [firstName,middleName,lastName];
            statistics.most_loyal_names.push(fullName.join(" "));
            statistics.most_party_votes.push(x.total_votes);
            statistics.most_party_percentage.push(x.votes_with_party_pct);
        });
      }

      return statistics;
}

function statisticsTableBuilder(statistics,tableSelector) //Build the table asked when called from html
{

      var partiesTotalNumber = 3;
      var partiesActualNumber = 0;

      var partyName = "";
      var partyNumbers = 0;
      var partyPct = 0;
      var stringToPass = [];

      if(tableSelector == "atGlance") //First table builder
      {
         stringToPass = ["<tr><th>Party</th><th>Nº of Reps</th><th>% voted w/ Party</th></tr>"]; //Header by default
         for (var i = 0; i <= partiesTotalNumber; i++)                                                //Run once for each party, and again for the "total" row.
         {                                                                                       //Set values to push at the end
            if(i == 0)
            {
              partyName = "Democrats";
              partyNumbers = statistics.number_democrats;
              if(partyNumbers > 0)partiesActualNumber++;
              partyPct = statistics.percentage_vote_party_democrats;
            }
            else if(i == 1)
            {
              partyName="Republicans";
              partyNumbers = statistics.number_republicans;
              if(partyNumbers > 0)partiesActualNumber++;
              partyPct = statistics.percentage_vote_party_republicans;
            }
            else if(i == 2)
            {
              partyName="Independents";
              partyNumbers = statistics.number_independents;
              if(partyNumbers > 0)partiesActualNumber++;
              partyPct = statistics.percentage_vote_party_independents;
            }
            else
            {
                partyName="Total";
                partyNumbers = (statistics.number_democrats + statistics.number_republicans + statistics.number_independents);
                partyPct = (statistics.percentage_vote_party_democrats + statistics.percentage_vote_party_republicans + statistics.percentage_vote_party_independents) / partiesActualNumber;
                partyPct = +(partyPct).toFixed(2);
            }

            stringToPass.push(["<tr><td>"+ partyName +"</td><td>"+ partyNumbers +"</td><td>"+ partyPct +"</td></tr>"]);
         }
      }
      else
      {
          if(statistics.attendanceCheck)
          {
              stringToPass = ["<tr><th>Party</th><th>Nº of Missed Votes</th><th>% Missed</th></tr>"];

              if(tableSelector == "leastEngaged") //Second table builder
              {

                 for (var j = 0; j < statistics.least_missed_names.length; j++)
                 {
                   stringToPass.push(["<tr><td>"+ statistics.least_missed_names[j] +"</td><td>"+ statistics.least_missed_votes[j] +"</td><td>"+ statistics.least_missed_percentage[j] +"</td></tr>"]);
                 }
              }
              else if(tableSelector == "mostEngaged") //Third table builder
              {
                for (var m = 0; m < statistics.most_missed_names.length; m++)
                 {
                   stringToPass.push(["<tr><td>"+ statistics.most_missed_names[m] +"</td><td>"+ statistics.most_missed_votes[m] +"</td><td>"+ statistics.most_missed_percentage[m] +"</td></tr>"]);
                 }
              }
          }
          else if(statistics.loyaltyCheck)
          {
            stringToPass = ["<tr><th>Party</th><th>Nº of Party Votes</th><th>% Party Votes</th></tr>"];

            if(tableSelector == "leastEngaged") //Second table builder
              {
                 for (var x = 0; x < statistics.least_loyal_names.length; x++)
                 {
                   stringToPass.push(["<tr><td>"+ statistics.least_loyal_names[x] +"</td><td>"+ statistics.least_party_votes[x] +"</td><td>"+ statistics.least_party_percentage[x] +"</td></tr>"]);
                 }
              }
              else if(tableSelector == "mostEngaged") //Third table builder
              {
                for (var y = 0; y < statistics.most_loyal_names.length; y++)
                 {
                   stringToPass.push(["<tr><td>"+ statistics.most_loyal_names[y] +"</td><td>"+ statistics.most_party_votes[y] +"</td><td>"+ statistics.most_party_percentage[y] +"</td></tr>"]);
                 }
              }
          }
      }

      return stringToPass.join("");
}




