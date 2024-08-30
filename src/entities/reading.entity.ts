export interface Reading {
    id: string;
    customer_code: string;
    image_id: string;
    measure_value: number;
    measure_type: string;
    measure_datetime: Date;
    has_confirmed: boolean;
    created_at: Date;
}
