'use client';

import React, { useState } from 'react';
import { Bus, Clock, MapPin, Search, Phone, ShieldCheck, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BusRoute {
  id: string;
  routeNumber: string;
  name: string;
  pathSummary: string;
  morningTimes: string[];
  returnTimes: string[];
  stops: string[];
  driverContact: string;
  busCapacity: string;
}

const BUS_ROUTES: BusRoute[] = [
  {
    id: 'route-1',
    routeNumber: 'Bus 01 & 02',
    name: 'Mirpur Express Route',
    pathSummary: 'Mirpur 10 ➔ Mirpur 1 ➔ Technical ➔ Gabtoli ➔ Birulia ➔ Khagan Permanent Campus',
    morningTimes: ['07:15 AM', '07:45 AM'],
    returnTimes: ['01:45 PM', '04:30 PM'],
    stops: [
      'Mirpur 10 Roundabout (Opposite Fire Service)',
      'Mirpur 2 Commerce College Gate',
      'Mirpur 1 Muktijoddha Market',
      'Technical Mor (Footbridge)',
      'Gabtoli Mazar Road Stand',
      'Beribadh Embankment Ghat',
      'Birulia Bridge Point',
      'Permanent Campus Main Gate (Khagan)',
    ],
    driverContact: '01711-234561 (Supervisor Rafiq)',
    busCapacity: '52 Seats',
  },
  {
    id: 'route-2',
    routeNumber: 'Bus 03 & 04',
    name: 'Uttara & Tongi Route',
    pathSummary: 'Tongi Station Rd ➔ House Building ➔ Azampur ➔ Rajlakshmi ➔ Diabari ➔ Campus',
    morningTimes: ['07:00 AM', '07:30 AM'],
    returnTimes: ['02:00 PM', '04:30 PM'],
    stops: [
      'Tongi Station Road Footbridge',
      'Uttara House Building (Sector 7)',
      'Azampur Bus Stand',
      'Rajlakshmi Complex',
      'Jasimuddin Road Junction',
      'Diabari Metro Rail Stn (Pillar 42)',
      'Ashulia Beribadh Highway',
      'City University Permanent Campus',
    ],
    driverContact: '01819-876542 (Supervisor Mizan)',
    busCapacity: '52 Seats',
  },
  {
    id: 'route-3',
    routeNumber: 'Bus 05',
    name: 'Dhanmondi & Mohammadpur Route',
    pathSummary: 'Jigatola ➔ Dhanmondi 27 ➔ Asad Gate ➔ Shyamoli ➔ Kalyanpur ➔ Gabtoli ➔ Campus',
    morningTimes: ['07:10 AM'],
    returnTimes: ['02:00 PM', '04:30 PM'],
    stops: [
      'Jigatola Bus Stand',
      'Dhanmondi 27 (Rapa Plaza Front)',
      'Asad Gate (St. Joseph School side)',
      'College Gate Footbridge',
      'Shyamoli Cinema Hall Point',
      'Kalyanpur Bus Stand',
      'Gabtoli Beribadh',
      'Permanent Campus Khagan',
    ],
    driverContact: '01912-345678 (Supervisor Alamgir)',
    busCapacity: '48 Seats',
  },
  {
    id: 'route-4',
    routeNumber: 'Bus 06',
    name: 'Motijheel & Farmgate Route',
    pathSummary: 'Motijheel ➔ Kakrail ➔ Moghbazar ➔ Farmgate ➔ Agargaon ➔ Mirpur 1 ➔ Campus',
    morningTimes: ['06:50 AM'],
    returnTimes: ['04:30 PM'],
    stops: [
      'Motijheel Shapla Chattar',
      'Kakrail Mor (Rajmoni Cinema)',
      'Moghbazar Wireless Gate',
      'Farmgate (Ananda Cinema Hall)',
      'Bijoy Sarani Rangs Bhaban',
      'Agargaon Passport Office Point',
      'Mirpur 1 Sony Cinema Hall',
      'City University Permanent Campus',
    ],
    driverContact: '01670-987654 (Supervisor Jahid)',
    busCapacity: '52 Seats',
  },
  {
    id: 'route-5',
    routeNumber: 'Bus 07',
    name: 'Savar & Ashulia Local Shuttle',
    pathSummary: 'Savar Bus Stand ➔ Nabinagar ➔ Baipayl ➔ Jamgora ➔ Ashulia ➔ Khagan Campus',
    morningTimes: ['07:30 AM', '08:15 AM'],
    returnTimes: ['01:30 PM', '03:30 PM', '05:00 PM'],
    stops: [
      'Savar Bus Stand (Overbridge)',
      'C&B Bus Stand',
      'Nabinagar Memorial Monument',
      'Baipayl Intersection',
      'Jamgora Fantasyland Gate',
      'Ashulia Model Town',
      'Birulia Road Intersection',
      'Permanent Campus Main Gate',
    ],
    driverContact: '01720-112233 (Supervisor Kabir)',
    busCapacity: '42 Seats',
  },
  {
    id: 'route-6',
    routeNumber: 'Bus 08',
    name: 'Gazipur & Konabari Route',
    pathSummary: 'Gazipur Chowrasta ➔ Konabari ➔ Kashimpur ➔ Zirani ➔ Birulia Campus',
    morningTimes: ['07:15 AM'],
    returnTimes: ['03:30 PM', '05:00 PM'],
    stops: [
      'Gazipur Chowrasta Flyover Point',
      'Konabari Bazar',
      'Kashimpur Jail Gate Road',
      'Zirani Bazar (BKSP Gate)',
      'Ashulia Highway',
      'City University Permanent Campus',
    ],
    driverContact: '01833-445566 (Supervisor Faruk)',
    busCapacity: '48 Seats',
  },
];

export const BusScheduleSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRoute, setExpandedRoute] = useState<string | null>('route-1');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'return'>('all');

  const filteredRoutes = BUS_ROUTES.filter((route) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      route.name.toLowerCase().includes(query) ||
      route.routeNumber.toLowerCase().includes(query) ||
      route.pathSummary.toLowerCase().includes(query) ||
      route.stops.some((s) => s.toLowerCase().includes(query));

    return matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-red-100 dark:bg-red-950/60 text-[#DC2626] flex items-center justify-center shrink-0">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white flex items-center gap-2">
                City University Bus Schedule & Routes
              </h3>
              <p className="text-xs text-zinc-500">
                Official varsity transport fleet connecting Dhaka metropolitan zones to the Permanent Campus (Khagan, Birulia).
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="outline" className="text-xs font-mono border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30">
            Active Fall 2026 Fleet
          </Badge>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stop, route or location (e.g. Mirpur, Uttara, Dhanmondi)..."
            className="pl-9 text-xs h-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setTimeFilter('all')}
            className={`text-xs h-7 px-3 font-bold rounded-md cursor-pointer ${
              timeFilter === 'all' ? 'bg-white dark:bg-zinc-800 text-[#DC2626] shadow-sm' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            All Trips
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setTimeFilter('morning')}
            className={`text-xs h-7 px-3 font-bold rounded-md cursor-pointer ${
              timeFilter === 'morning' ? 'bg-white dark:bg-zinc-800 text-[#DC2626] shadow-sm' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Morning to Campus
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setTimeFilter('return')}
            className={`text-xs h-7 px-3 font-bold rounded-md cursor-pointer ${
              timeFilter === 'return' ? 'bg-white dark:bg-zinc-800 text-[#DC2626] shadow-sm' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Return from Campus
          </Button>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {filteredRoutes.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            <Bus className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
            <p className="text-xs text-zinc-500">No bus routes match your search keyword "{searchTerm}".</p>
          </div>
        ) : (
          filteredRoutes.map((route) => {
            const isExpanded = expandedRoute === route.id;
            return (
              <div
                key={route.id}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/60 transition-all hover:border-red-300 dark:hover:border-red-900/60"
              >
                {/* Header item */}
                <div
                  onClick={() => setExpandedRoute(isExpanded ? null : route.id)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-[#DC2626] text-white px-2 py-0.5 rounded-md">
                        {route.routeNumber}
                      </span>
                      <h4 className="font-bold text-sm text-zinc-950 dark:text-white">
                        {route.name}
                      </h4>
                      <Badge variant="outline" className="text-[10px] text-zinc-500">
                        {route.busCapacity}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {route.pathSummary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    {/* Time pills */}
                    <div className="flex items-center gap-2">
                      {(timeFilter === 'all' || timeFilter === 'morning') && (
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                            To Campus
                          </span>
                          <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                            {route.morningTimes.join(' / ')}
                          </span>
                        </div>
                      )}

                      {(timeFilter === 'all' || timeFilter === 'return') && (
                        <div className="text-right pl-3 border-l border-zinc-200 dark:border-zinc-800">
                          <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 block">
                            Return
                          </span>
                          <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                            {route.returnTimes.join(' / ')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-zinc-400 pl-2">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 space-y-4">
                    {/* Timings row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-50 dark:bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70">
                      <div className="space-y-1">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> Morning Departure Times (From Dhaka Start Point):
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {route.morningTimes.map((t) => (
                            <span key={t} className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-mono font-bold px-2 py-0.5 rounded text-xs">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> Return Departs (From Permanent Campus Birulia Gate):
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {route.returnTimes.map((t) => (
                            <span key={t} className="bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-300 font-mono font-bold px-2 py-0.5 rounded text-xs">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stoppages sequence */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#DC2626]" /> Official Stoppages In Order:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {route.stops.map((stop, idx) => (
                          <div
                            key={stop}
                            className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800"
                          >
                            <span className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                              {stop}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Supervisor */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-500 gap-2 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Route Coordinator: <strong className="text-zinc-700 dark:text-zinc-300">{route.driverContact}</strong></span>
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        * Please arrive 5 minutes prior to scheduled boarding time.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Rules Notice */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs space-y-2">
        <h5 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-amber-600" />
          University Transport Boarding Guidelines
        </h5>
        <ul className="text-amber-800 dark:text-amber-400 space-y-1 list-disc list-inside">
          <li>Students must show their official City University ID Card with valid semester sticker when boarding.</li>
          <li>Varsity bus service operates Saturday through Thursday during academic sessions.</li>
          <li>For Friday special examination or event schedules, please check notice board 24 hours prior.</li>
          <li>Transport Emergency Hotline: <strong>01819-223344</strong> (Ext. 302 / transport@city.edu).</li>
        </ul>
      </div>
    </div>
  );
};

export default BusScheduleSection;
