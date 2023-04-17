import stc from '../assets/stc_logo.png'
import shaq from  '../assets/shaq.png'
import Explore from  '../assets/logo4.png'
import Guliver from  '../assets/logo3.png'

const buses = [
    {
        id:1,
        logo: stc,
        name : 'STC',
        rating: '4.5',
        busType: 'Scania bus',
        seatsLeft : 28,
        from : 'kumasi',
        to : 'Tamale',
        depTime : '09:00 AM',
        Arival : '02:15 PM',
        fare : 250, 
        aminities : ['AC','WIFI','TV'],
        date: Date.now()
    },
    {
        id:2,
        logo: shaq,
        name : 'Shaq',
        rating: '4.5',
        busType: 'Scania bus',
        seatsLeft : 5,
        from : 'Accra',
        to : 'tamale',
        depTime : '09:00 AM',
        Arival : '02:15 PM',
        fare : 198, 
        aminities : ['AC','WIFI','TV'],
        date: Date.now()
    },
    {
        id:3,
        logo: Explore,
        name : 'Explore',
        rating: '4.5',
        busType: 'Scania bus',
        seatsLeft : 18,
        from : 'tamale',
        to : 'kumasi',
        depTime : '09:00 AM',
        Arival : '02:15 PM',
        fare : 240, 
        aminities : ['AC','Wi-Fi','TV','Drinks','3 stops'],
        date: Date.now(),
        Pickup: 'yes'
    },
    {
        id:4,
        logo: Guliver,
        name : 'Gulivers',
        rating: '4.5',
        busType: 'Scania bus',
        seatsLeft : 25,
        from : 'Accra',
        to : 'Tamale',
        depTime : '09:00 AM',
        Arival : '02:15 PM',
        fare : 220, 
        aminities : ['AC','WIFI','TV'],
        date: Date.now()
    }
]

export default buses