export interface CreateReadingDTO {
    customer_code: string;
    image_id: string;
    measure_value: number;
    measure_type: string;
    measure_datetime: Date;
    has_confirmed: boolean;
}

export interface CreateReadingDTORequest {
    image: string;
    customer_code: string;
    measure_datetime: Date;
    measure_type: string;
}

export interface CreateReadingResponseDTO {
    image_url: string;
    measure_value: number;
    measure_uuid: string;
}

export interface ConfirmReadingDTO {
    measure_uuid: string;
    confirmed_value: number;
}

export interface GetAllReadingsDTO {
    customer_code: string;
    measure_type: string;
}