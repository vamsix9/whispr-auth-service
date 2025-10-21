import {
    prop,
    getModelForClass,
    modelOptions,
    Ref,
} from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class User {
    @prop({ required: true, enum: ['manual', 'social'] })
    signUpType!: string;

    @prop({ required: true })
    userName!: string;

    @prop()
    email!: string;

    @prop({ required: true })
    password!: string;
}

export const UserModel = getModelForClass(User);