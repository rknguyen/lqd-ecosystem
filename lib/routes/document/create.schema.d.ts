declare const _default: {
    on: string[];
    schema: {
        name: {
            type: StringConstructor;
            length: {
                min: number;
            };
            required: boolean;
        };
        fields: {
            type: ArrayConstructor;
            required: boolean;
        };
        attachment: {
            required: boolean;
        };
    };
};
export default _default;
