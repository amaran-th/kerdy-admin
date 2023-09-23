import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';


const ImagesUploader = ({ title, informationImages, setInformationImages }) => {
    const MAX_IMAGE_COUNT = 200;
    const [base64s, setBase64s] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        setInformationImages([...informationImages, ...acceptedFiles]);
        setBase64s([...base64s, ...acceptedFiles.map((file) => URL.createObjectURL(file))])
    }, [informationImages]);

    useEffect(() => {

    }, [informationImages]);

    const { getRootProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg'],
        },
        onDropRejected: (files) => {
            if (files.length > MAX_IMAGE_COUNT) {
                window.confirm('썸네일 이미지는 한 개만 업로드할 수 있습니다.')
            } else {
                window.confirm('이미지 파일(png, jpg, jpeg, gif)만 업로드 가능합니다.')
            }
        },
    });

    const handleToDefaultImageClick = () => {
        setBase64s([])
        setInformationImages([]);
    };

    return (
        <div className="flex h-full flex-col space-y-[10px]">
            <div className="flex shrink items-center justify-between">
                <p className="text-paragraph">{title || '썸네일'}</p>
                <button
                    className="text-small underline underline-offset-4 hover:text-pointBlue"
                    type="button"
                    onClick={handleToDefaultImageClick}
                >
                    초기화
                </button>
            </div>
            <div>
                <div
                    {...getRootProps()}
                    className={`
          ${isDragActive ? 'bg-pointBlue/30' : ''} 
          border-2 relative flex h-40 items-center justify-center border-dashed !border-pointBlue/30 hover:opacity-70
        `}
                >
                    <div className="flex items-center">
                        {isDragActive ? (
                            <p className="mx-2 text-center text-xs">이미지를 놓으세요</p>
                        ) : (
                            <div className="text-center">
                                <MdOutlineAddPhotoAlternate className="mx-auto mb-1 h-[30px] w-[30px]" />
                                <p className="text-xs">
                                    클릭 또는 드래그하여
                                    <br />
                                    이미지를 첨부하세요
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex overflow-x-auto">
                    {base64s?.length !== 0 ?
                        base64s.map(base64 => (
                            <img
                                className={`${isDragActive ? 'opacity-50' : ''} inset-0 h-40 w-40 object-cover`}
                                src={base64}
                                alt="thumbnail"
                            />
                        ))
                        : ''
                    }
                </div>
            </div>
        </div>
    );
};
export default ImagesUploader;