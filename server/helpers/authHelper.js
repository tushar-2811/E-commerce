import bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword) => {
     try{
        const hashedPassword = await bcrypt.hash(plainPassword, 12);
        return hashedPassword;

     }catch(error){
        console.log(error);
     }
}


export const comparePassword = async(plainpassword,hashedPassword) => {
    return bcrypt.compare(plainpassword,hashedPassword);
}