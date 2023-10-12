use ic_cdk_macros::{query, update, export_candid};

fn retrieve(path: &str) -> Option<&'static [u8]> {
    match path {
        "/index.html" | "/" => Some(include_bytes!("../../../dist/frontend/index.html")),
        "/index.js" => Some(include_bytes!("../../../dist/frontend/index.js")),
        _ => None,
    }
}

fn get_path(url: &str) -> Option<&str> {
    url.split('?').next()
}

export_candid!();
