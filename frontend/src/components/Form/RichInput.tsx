import JoditEditor from "jodit-react";
import { useMemo } from "react";

export function RichInput() {
    return (
        
        <JoditEditor
            value={''}
            // config={{ readonly: false }}
            onChange={(newContent) => { }}
        />
    );

}