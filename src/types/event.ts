export interface Wave {
    bus_instructions: string | null
    feature_id: number
    id: number
    max_number: number
    name: string
    notes: string | null
    order: number
    planned_start_time: string | null
    start_time: string | null
  }
  
export interface EventFeature {
    bib_max: number
    bib_start: number
    cap: number
    cert_number: string
    costs: number[] 
    event_id: number
    finish_counts: {
      female: number
      male: number
      total: number
      unspecified: number
    }
    help_text: string
    id: number
    name: string
    num_reg: number
    order: number
    pace_units: number
    parking_address: string
    path_id: number | null
    sold_out: boolean
    start_datetime: string
    state: number
    type: number
    waitlist_when_soldout: boolean
    waiver: string
    waves: Wave[] 
  }
  
  export interface Event {
    cost_change_dates: string[] 
    date: string
    desc: string
    features: EventFeature[]
    full_name: string
    genders: string[]
    hide_date: boolean
    host_id: number
    id: number
    klass_id: number | null
    lookup_id: number | null
    mapp_id: number | null
    name: string
    pins: {
      primary: string
      timers: string
    }
    reg_fee: number
    reg_fee_desc: string
    reg_fee_name: string
    reg_fee_percent: number
    registration_closes: string
    registration_opens: string
    sales_tax_rate: number
    short_name: string
    status: number
    volunteer_closed: boolean
    volunteer_closed_message: string
    waivers: {
      participant: string
      vendor: string
      volunteer: string
    }
  }
  