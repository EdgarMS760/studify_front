import React, { useEffect, useState } from 'react';
import { usePDFSlick } from '@pdfslick/react';
import '@pdfslick/react/dist/pdf_viewer.css';

import clsx from "clsx";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigationMUI } from '@libs/store/NavigationContext';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Box, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
function PDFNavigation({
    usePDFSlickStore,
}) {
    const pageNumber = usePDFSlickStore((s) => s.pageNumber);
    const numPages = usePDFSlickStore((s) => s.numPages);
    const pdfSlick = usePDFSlickStore((s) => s.pdfSlick);
    const scale = usePDFSlickStore((s) => s.scale);
    return (
        <div className="fixed w-full h-12 bottom-0 right-0 z-50 pointer-events-none">
            <div className="flex justify-center">
                <div
                    className={clsx(
                        "inline-flex rounded shadow justify-center border border-slate-300",
                        "bg-white",
                        "divide-x divide-x-slate-100"
                    )}
                >
                    <button
                        disabled={pageNumber === 1}
                        onClick={() => pdfSlick?.gotoPage(pageNumber - 1)}
                        type="button"
                        className="relative inline-flex items-center rounded-l px-2 py-2 text-slate-500 ring-0 ring-inset ring-slate-700 hover:bg-slate-50 enabled:hover:text-slate-900 transition-all focus:z-10 disabled:opacity-70 pointer-events-auto"
                    >
                        <span className="sr-only">Previous</span>
                        <NavigateBeforeIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        disabled={!pdfSlick || scale <= 0.25}
                        onClick={() => pdfSlick?.viewer?.decreaseScale()}
                        type="button"
                        className="relative inline-flex items-center px-2 py-2 text-slate-500 ring-0 ring-inset ring-slate-700 hover:bg-slate-50 enabled:hover:text-slate-900 transition-all focus:z-10 pointer-events-auto disabled:opacity-70"
                    >
                        <span className="sr-only">Zoom Out</span>
                        <ZoomOutIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        disabled={!pdfSlick || scale >= 5}
                        onClick={() => pdfSlick?.viewer?.increaseScale()}
                        type="button"
                        className="relative inline-flex items-center px-2 py-2 text-slate-500 ring-0 ring-inset ring-slate-700 hover:bg-slate-50 enabled:hover:text-slate-900 transition-all focus:z-10 pointer-events-auto disabled:opacity-70"
                    >
                        <span className="sr-only">Zoom In</span>
                        <ZoomInIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        disabled={numPages <= pageNumber}
                        onClick={() => pdfSlick?.gotoPage(pageNumber + 1)}
                        type="button"
                        className="relative inline-flex items-center rounded-r px-2 py-2 text-slate-500 ring-0 ring-inset ring-slate-700 hover:bg-slate-50 enabled:hover:text-slate-900 transition-all focus:z-10 disabled:opacity-70 pointer-events-auto"
                    >
                        <span className="sr-only">Next</span>
                        <NavigateNextIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}

const PdfViewer = ({ fileUrl }) => {
        const [error, setError] = useState(false);
    const {
        viewerRef,
        thumbsRef,
        usePDFSlickStore,
        PDFSlickViewer,
        PDFSlickThumbnails,
    } = usePDFSlick(fileUrl, {
        thumbnailWidth: 370,
        singlePageViewer: true,
        removePageBorders: true,
        scaleValue: "page-fit",
    });
    const [open, setOpen] = useState(false);
    const pdfSlick = usePDFSlickStore((s) => s.pdfSlick);
    const pageNumber = usePDFSlickStore((s) => s.pageNumber);
    const numPages = usePDFSlickStore((s) => s.numPages);
    const pagesOverview = pdfSlick?.getPagesOverview();
    const { setHideNavigation } = useNavigationMUI();
    const onPageOpen = (pageNumber) => {
        pdfSlick?.gotoPage(pageNumber);
        setOpen(true);
        setHideNavigation(true);
    };

        useEffect(() => {
        const validatePdf = async () => {
            try {
                const overview = pdfSlick?.getPagesOverview();
                if (!overview || overview.length === 0) {
                    throw new Error("Archivo no válido");
                }
            } catch (e) {
                setError(true);
            }
        };

        if (pdfSlick) {
            validatePdf();
        }
    }, [pdfSlick]);
    
    useEffect(() => {
        if (open) {
            pdfSlick?.viewer.update();
        }
    }, [open]);

    if (error) {
        return (
            <div className="p-6 text-red-500 text-center">
                El archivo proporcionado no es un PDF válido.
            </div>
        );
    }

    return (
        <>
            <div className="p-2 relative w-full h-1/2 [@media(min-width:1750px)]:h-3/4 [@media(min-width:2000px)]:h-7/8 z-10">
                <PDFSlickThumbnails
                    {...{ thumbsRef, usePDFSlickStore }}
                >
                    {({ pageNumber, width, height, src }) =>
                        pageNumber === 1 && (
                            <div
                                key={pageNumber}
                                className="group p-4 rounded-sm shadow-sm"
                                onClick={() => onPageOpen(pageNumber)}
                            >
                                <div
                                    className={clsx(
                                        "w-full overflow-hidden rounded-sm border border-gray-200 cursor-pointer",
                                        "shadow-sm group-hover:shadow-lg",
                                        "scale-[.99] group-hover:scale-100 origin-bottom",
                                        "aspect-h-1 aspect-w-1 sm:aspect-h-3 sm:aspect-w-2",
                                        "transition-all duration-200 ease-in-out"
                                    )}
                                >
                                    {src && (
                                        <img
                                            src={src}
                                            width={width}
                                            height={height}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    }
                </PDFSlickThumbnails>

            </div>

            <div
                className={clsx("fixed inset-0 z-20 transition-all", {
                    "h-full overflow-auto delay-0 duration-0": open,
                    "h-0 overflow-hidden delay-300 duration-0": !open,
                })}
            >
                <div
                    className={clsx(
                        "absolute inset-0 bg-white/20 backdrop-blur-sm transition-opacity",
                        {
                            "opacity-100 ease-out duration-300": open,
                            "opacity-0 ease-in duration-200": !open,
                        }
                    )}
                />
                <div
                    className={clsx(
                        "absolute inset-0 flex flex-col transition-opacity duration-300",
                        {
                            "opacity-0": !open,
                            "opacity-100": open,
                        }
                    )}
                >
                    <div className="flex-1 relative overflow-auto mt-20">
                        <PDFSlickViewer
                            {...{
                                viewerRef,
                                usePDFSlickStore,
                            }}
                        />
                    </div>

                    <Box
                        sx={[
                            (theme) => ({
                                backgroundColor: "white",
                            }),
                            (theme) =>
                                theme.applyStyles('dark', {
                                    backgroundColor: theme.vars.palette.secondary.main,
                                }),
                        ]}
                        className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 [box-shadow:1px_0_2px_0_rgb(0_0_0_/_0.1)]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 sm:gap-6">
                            <div className='flex justify-center items-center sm:justify-end'>
                                <a
                                    href={fileUrl}
                                    download
                                    className=" mx-2 bg-gray-100 shadow-sm text-gray-400 rounded-md p-1 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-0 focus:ring-orange-500"
                                >
                                    <span className="sr-only">Download</span>
                                    <DownloadIcon className="w-6 h-6" sx={{ color: 'black' }} />
                                </a>
                            </div>
                            <nav
                                className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mx-auto"
                                aria-label="Pagination"
                            >

                                <IconButton onClick={() => pdfSlick?.gotoPage(1)} disabled={pageNumber <= 1} aria-label="first" color="primary" size="large"
                                    className="inline-flex items-center px-2.5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 enabled:hover:bg-gray-50 focus:outline-none disabled:text-gray-300"
                                >
                                    <FirstPageIcon fontSize="inherit" />
                                </IconButton>


                                <IconButton onClick={() => pdfSlick?.gotoPage(pageNumber - 1)} disabled={pageNumber <= 1} aria-label="Previous" color="primary" size="large"
                                    className="inline-flex items-center px-2.5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 enabled:hover:bg-gray-50 focus:outline-none disabled:text-gray-300"
                                >
                                    <NavigateBeforeIcon className="h-5 w-5" aria-hidden="true" />
                                </IconButton>


                                <Box sx={[
                                    (theme) => ({
                                        color: "black",
                                    }),
                                    (theme) =>
                                        theme.applyStyles('dark', {
                                            color: "white",
                                        }),
                                ]} className="px-4 py-2 text-sm ring-1 ring-inset ring-gray-300 rounded-md">
                                    <p className="text-sm  text-center">
                                        Mostrando pagina <span className="font-medium">{pageNumber}</span> de <span className="font-medium">{numPages}</span>
                                    </p>
                                </Box>

                                <IconButton onClick={() => pdfSlick?.gotoPage(pageNumber + 1)} disabled={pageNumber >= numPages} aria-label="Next" color="primary" size="large"
                                    className="inline-flex items-center px-2.5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 enabled:hover:bg-gray-50 focus:outline-none disabled:text-gray-300"
                                >
                                    <NavigateNextIcon className="h-5 w-5" aria-hidden="true" />
                                </IconButton>

                                <IconButton onClick={() => pdfSlick?.gotoPage(numPages)} disabled={pageNumber >= numPages} aria-label="Last" color="primary" size="large"
                                    className="inline-flex items-center px-2.5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 enabled:hover:bg-gray-50 focus:outline-none disabled:text-gray-300"
                                >
                                    <LastPageIcon className="h-5 w-5" aria-hidden="true" />
                                </IconButton>
                            </nav>
                            <div className="flex justify-center items-center sm:justify-end">

                                <button
                                    onClick={() => { setOpen(false); setHideNavigation(false) }}
                                    type="button"
                                    className="shadow-sm text-primary rounded-md p-2"
                                >
                                    <span className="sr-only">Close</span>
                                    <CloseIcon className="w-6 h-6" sx={{ color: 'black' }} />
                                </button>
                            </div>
                        </div>


                    </Box>
                </div>
            </div>
        </>
    );
};

export default PdfViewer;
