export type orderInfoType = {
    source_time: number | string,
    address: string,
    coords: number[]
}

export type crewInfoType = {
    crew_id: number | string,
    car_mark: string,
    car_model: string,
    car_color: string,
    car_number: string,
    driver_name: string,
    driver_phone: number | string,
    coords: number[]
    distance: number
}
