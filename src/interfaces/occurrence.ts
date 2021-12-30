import { Image } from './image'

export interface Occurrence {
    id?: number,
    createdAt: string,
    name: string,
    latitude: number,
    longitude: number,
    obs: string,
    serviceId: number,
    status: number,
    service: {
        serviceName: string
    },
    images: Image[]
}